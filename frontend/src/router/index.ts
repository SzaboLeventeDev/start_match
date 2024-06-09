import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useAuthenticationStore from '@/stores/useAuthenticationStore'


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
      component: () =>import('@/views/core/DashboardView.vue')
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: () => import('@/views/core/ProfileView.vue'),
      props: true,
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
