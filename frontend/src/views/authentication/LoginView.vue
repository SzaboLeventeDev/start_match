<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
</script>
<template>
  <VContainer class="loginView">
    <base-form>
    <template #title>
      <VCardTitle>Login</VCardTitle>
    </template>
    <template #content>
      <VTextField label="Email" variant="outlined" prepend-inner-icon="mdi-account" />
      <VTextField label="Password" variant="outlined" type="password" prepend-inner-icon="mdi-lock" append-inner-icon="mdi-eye"/>
    </template>
    <template #actions>

      <!-- <VContainer class='buttonWrapper'> -->
        <RouterLink :to="{ name: 'registration' }">
          <BaseButton mode="flat">Registration</BaseButton>
        </RouterLink>
        <BaseButton>Login</BaseButton>
        
      <!-- </VContainer> -->
    </template>
      
    </base-form>
  </VContainer>
</template>
<style scoped>
.loginView {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  width: 80%;
}

.buttonWrapper {
  padding: unset;
  display: flex;
  justify-content: space-around;
}
</style>