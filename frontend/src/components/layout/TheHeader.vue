<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

const isMobileNavBarVisible = ref(false)

const toggleMobileNav = () => {
  isMobileNavBarVisible.value = !isMobileNavBarVisible.value
}
</script>
<template>
  <VContainer class="header">
    <VLabel>SmartMatch</VLabel>
    <VIcon
      icon="mdi-menu"
      color="var(--c-white)"
      size="large"
      class="hamburger"
      @click="toggleMobileNav"
    />
    <VContainer class="navbar" >
      <BaseButton>About us</BaseButton>
      <BaseButton>Our mission</BaseButton>
      <BaseButton>Contact</BaseButton>
      <BaseButton>Q&A</BaseButton>
      <BaseButton>
        <template #icon>
          <VIcon icon="mdi-login" />
        </template>
        Login
      </BaseButton>
    </VContainer>
  </VContainer>
  <VContainer v-if='isMobileNavBarVisible' class="sidebar isVisible" >
    <BaseButton>About us</BaseButton>
    <BaseButton>Our mission</BaseButton>
    <BaseButton>Contact</BaseButton>
    <BaseButton>Q&A</BaseButton>
  </VContainer>
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
  @media(min-width: 1024px) {
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
  z-index:10;
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
