import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthorizationStore } from './useAuthorizationStore'
const useAuthenticationStore = defineStore('user', () => {
  const authorizationStore = useAuthorizationStore()

  /** States */
  const userId = ref<string | null>(null)
  const isLoggedIn = ref<boolean>(false)

  /** Getters */
  const getUserId = computed(() => userId.value)
  const getIsLoggedIn = computed(() => isLoggedIn.value)

  /** Actions */
  const initUserId = (id: string) => {
    userId.value = id
  }

  const removeUserId = () => {
    userId.value = null
  }

  const authenticateUser = () => {
    isLoggedIn.value = true
  }

  const logoutUser = () => {
    isLoggedIn.value = false
    removeUserId()
    authorizationStore.removeUserRoles()
  }

  return {
    getUserId,
    getIsLoggedIn,
    initUserId,
    removeUserId,
    authenticateUser,
    logoutUser
  }
})

export default useAuthenticationStore;
