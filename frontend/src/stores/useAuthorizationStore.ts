import { UserRole } from '@/enums/userRole'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthorizationStore = defineStore('authorization', () => {
  /** States */
  const userRoles = ref<UserRole[]>([])

  /** Getters */
  const isAdmin = computed(() => userRoles.value.includes(UserRole.Admin))

  /**Actions */
  const setRoles = (roles: UserRole[]): void => {
    userRoles.value = roles
  }

  const removeUserRoles = (): void => {
    userRoles.value = []
  }
  return {
    userRoles,
    isAdmin,
    setRoles,
    removeUserRoles
  }
})
