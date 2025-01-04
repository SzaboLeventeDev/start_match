<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { sendRequest } from '@/core/sendRequest'
import router from '@/router';
import { ref } from 'vue';
import useAuthenticationStore from '@/stores/useAuthenticationStore';
import { useAuthorizationStore } from '@/stores/useAuthorizationStore';

const loginData = ref<{ email: string; password: string }>({
  email: '',
  password: ''
})
const authenticationStore = useAuthenticationStore();
const { initUserId, authenticateUser } = authenticationStore;

const authorizationStore = useAuthorizationStore();
const { userRoles, setRoles } = authorizationStore;

const loginUser = async () => {
  const { roles, userId } = await sendRequest('login', 'POST', loginData.value, undefined, true);
  
  initUserId(userId);
  authenticateUser();

  if(roles.length === 0) {
    router.push({name: 'selectRole'});
    return;
  } 

  if(userRoles.length === 0) {
    setRoles(roles);
  }

  router.push({ name: 'dashboard' });
}

</script>
<template>
  <VContainer class="loginView">
    <base-form>
      <template #title>
        <VCardTitle>Login</VCardTitle>
      </template>
      <template #content>
        <VTextField label="Email" variant="outlined" prepend-inner-icon="mdi-account" v-model="loginData.email" />
        <VTextField
          label="Password"
          variant="outlined"
          type="password"
          prepend-inner-icon="mdi-lock"
          append-inner-icon="mdi-eye"
          v-model="loginData.password"
        />
      </template>
      <template #actions>
        <RouterLink :to="{ name: 'registration' }">
          <BaseButton mode="flat">Registration</BaseButton>
        </RouterLink>
        <BaseButton @click="loginUser">Login</BaseButton>
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

@media (min-width: 768px) {
  form {
    width: 400px;
  }
}
</style>