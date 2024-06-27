import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useAuthenticationStore = defineStore('user', () => {
  /** States */
  const userId = ref<string | null>(null);
  const isLoggedIn = ref<boolean>(false);

  /** Getters */
  const getUserId = computed(() => userId.value);
  const getIsLoggedIn = computed(() => isLoggedIn.value);

  /** Actions */
  const initUserId = (id: string) => {
    userId.value = id;
  }

  const removeUserId = () => {
    userId.value = null;
  }

  const authenticateUser = () => {
    isLoggedIn.value = true;
  }

   const logoutUser = () => {
     isLoggedIn.value = false;
     removeUserId();
   }

  return {
    getUserId,
    getIsLoggedIn,
    initUserId,
    removeUserId,
    authenticateUser,
    logoutUser,
  }
})

export default useAuthenticationStore;
