<script setup lang="ts">
import { ref, computed } from 'vue'
import NavButton from '../ui/NavButton.vue'
import useAuthenticationStore from '@/stores/useAuthenticationStore'
import router from '@/router'

const isMobileNavBarVisible = ref(false)
const authStore = useAuthenticationStore()
const { logoutUser } = authStore

const userId = computed(() => authStore.getUserId)
const isLoggedIn = computed(() => authStore.getIsLoggedIn)
const toggleMobileNav = () => {
  isMobileNavBarVisible.value = !isMobileNavBarVisible.value
}

const handleLoginOrLogout = () => {
  if (isLoggedIn) {
    logoutUser()
    router.push({ name: 'home' })
    return
  }
  router.push({ name: 'login' })
  return
}
</script>
<template>
  <v-container class="container flex justify-between absolute z-3">
    <router-link :to="{ name: isLoggedIn ? 'dashboard' : 'home' }">
      <v-label>SmartMatch</v-label>
    </router-link>
    <VIcon
      icon="mdi-menu"
      color="var(--c-white)"
      size="large"
      class="z-10 md:max-w-none lg:invisible"
      @click="toggleMobileNav"
    />
      <v-container
        class="hidden invisible lg:flex lg:justify-end lg:visible lg:m-0 lg:p-0 lg:w-auto"
      >
        <nav-button>About us</nav-button>
        <nav-button>Our mission</nav-button>
        <nav-button>Contact</nav-button>
        <nav-button>Q&A</nav-button>
        <router-link
          v-if="isLoggedIn"
          :to="{
            name: 'profile',
            params: {
              userId: userId
            }
          }"
        >
          <nav-button>Profile</nav-button>
        </router-link>
        <router-link :to="{ name: isLoggedIn ? 'home' : 'login' }">
          <nav-button @click="handleLoginOrLogout">
            <template #icon>
              <v-icon :icon="isLoggedIn ? 'mdi-logout' : 'mdi-login'" />
            </template>
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </nav-button>
        </router-link>
      </v-container>
  </v-container>
  <v-container
    :class="[
      'right-0 flex flex-col bg-night-blue h-full py-20 pt-10 z-[2] absolute w-auto', isMobileNavBarVisible ? 'animate-slideIn': 'animate-slideOut'
    ]"
    >
    <nav-button v-if="!isLoggedIn">About us</nav-button>
    <nav-button v-if="!isLoggedIn">Our mission</nav-button>
    <nav-button>Contact</nav-button>
    <nav-button>Q&A</nav-button>
    <router-link
      v-if="isLoggedIn"
      :to="{
        name: 'profile',
        params: {
          userId: userId
        }
      }"
    >
      <nav-button>Profile</nav-button>
    </router-link>
    <router-link :to="{ name: isLoggedIn ? 'home' : 'login' }">
      <nav-button @click="handleLoginOrLogout">
        <template #icon>
          <v-icon :icon="isLoggedIn ? 'mdi-logout' : 'mdi-login'" />
        </template>
        {{ isLoggedIn ? 'Logout' : 'Login' }}
      </nav-button>
    </router-link>
  </v-container>
</template>
