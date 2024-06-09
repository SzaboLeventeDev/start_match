<script setup lang="ts">
import { ref, computed } from 'vue';
import NavButton from '../ui/NavButton.vue';
import useAuthenticationStore from '@/stores/useAuthenticationStore';
import router from '@/router';

const isMobileNavBarVisible = ref(false);
const authStore = useAuthenticationStore();
const { logoutUser } = authStore;

const userId = computed(() => authStore.getUserId);
const isLoggedIn = computed(() => authStore.getIsLoggedIn);
const toggleMobileNav = () => {
  isMobileNavBarVisible.value = !isMobileNavBarVisible.value;
}

const handleLoginOrLogout = () => {
  if (isLoggedIn) {
    logoutUser();
    router.push({ name: 'home' });
    return;
  }
  router.push({ name: 'login' });
  return;
}
</script>
<template>
  <v-container class="header">
    <router-link :to="{ name: isLoggedIn ? 'dashboard' : 'home' }">
      <v-label>SmartMatch</v-label>
    </router-link>
    <VIcon
      icon="mdi-menu"
      color="var(--c-white)"
      size="large"
      class="hamburger"
      @click="toggleMobileNav"
    />
    <v-container class="navbar">
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
  <v-container v-if="isMobileNavBarVisible" class="sidebar isVisible">
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
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 3;
}
.navbar {
  display: none;
  visibility: hidden;
  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    visibility: visible;
    margin: 0;
    padding: 0;
    width: auto;
  }
}

.sidebar {
  right: 0;
  flex-direction: column;
  opacity: 0;
}

.sidebar.isVisible {
  opacity: 1;
  transition: opacity 0.5s;
  width: auto;
  display: flex;
  position: absolute;
  background-color: var(--c-blue);
  height: 100%;
  padding: 5rem 0;
  z-index: 2;
}

.hamburger {
  z-index: 10;
  @media (min-width: 1024px) {
    display: none;
  }
}

@media (min-width: 768px) {
  .v-container {
    max-width: none;
  }
}
</style>
