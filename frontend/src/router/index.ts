import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useAuthenticationStore from '@/stores/useAuthenticationStore'
import { useAuthorizationStore } from '@/stores/useAuthorizationStore'
import { UserRole } from '@/enums/userRole'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/authentication/LoginView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/authentication/RegistrationView.vue')
    },
    {
      path: '/select-role',
      name: 'selectRole',
      component: () => import('@/views/authentication/InitRoleView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/core/DashboardView.vue')
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: () => import('@/views/core/ProfileView.vue'),
      props: true
    },
    {
      path: '/master-data',
      name: 'masterData',
      component: () => import('@/views/core/masterData/MasterDataView.vue'),
      beforeEnter: async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        // check if the user role is admin to enter
        const authorizationStore = useAuthorizationStore()
        if (authorizationStore.userRoles.includes(UserRole.Admin)) {
          next()
        } else {
          console.warn('Unauthorized access to master data')
          // next({ name: 'unauthozized'}) // TODO: create unauthorized view
        }

        // load store
        const { useMasterDataStore } = await import('@/stores/masterData/useMasterDataStore')
        useMasterDataStore()
      },
      children: [
        {
          path: 'currencies',
          name: 'currencies',
          component: () => import('@/views/core/masterData/CurrenciesView.vue'),
          beforeEnter: async (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
          ) => {
            const { useMasterDataStore } = await import('@/stores/masterData/useMasterDataStore')
            const masterDataStore = useMasterDataStore()
            if (!masterDataStore.currencyStore) {
              await masterDataStore.getAndInitCurrencyStore()
            }

            next()
          }
        },
        {
          path: 'project-categories',
          name: 'projectCategories',
          component: () => import('@/views/core/masterData/ProjectCategoriesView.vue'),
          beforeEnter: async (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
          ) => {
            const { useMasterDataStore } = await import('@/stores/masterData/useMasterDataStore')
            const masterDataStore = useMasterDataStore()
            if (!masterDataStore.projectCategoryStore) {
              await masterDataStore.getAndInitProjectCategoryStore()
            }

            next()
          }
        }
      ]
    },
    {
      name: 'myProjects',
      path: '/my-projects',
      component: () => import('@/views/core/project/MyProjectsView.vue')
    },
    {
      name: 'mySelectedProject',
      path: '/my-projects/:projectId',
      component: () => import('@/views/core/project/MyProjectView.vue')
    },
    {
      name: 'addNewProject',
      path: '/my-projects/add',
      component: () => import('@/views/core/project/MyProjectView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthenticationStore()
    if (
      to.name !== 'home' &&
      to.name !== 'registration' &&
      to.name !== 'login' &&
      !authStore.getIsLoggedIn
    ) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
)
export default router
