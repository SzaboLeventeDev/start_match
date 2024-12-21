<script setup lang="ts">
import { sendRequest } from '@/core/sendRequest';
import { UserRole } from '@/enums/userRole';
import useAuthenticationStore from '@/stores/useAuthenticationStore';
import router from '@/router';

const authStore = useAuthenticationStore();

const { getUserId } = authStore;

const selectRole = async (userRoleId: number): Promise<void> => {
  await sendRequest('select-role', 'POST', { userId: getUserId, userRoleId });
  router.push({name: 'dashboard'});
}

</script>
<template>
  <base-modal>
    <template #title>Please select role!</template>
    <template #actions>
      <base-button @click="selectRole(UserRole.Enterpreneur)">Enterpreneur</base-button>
      <base-button @click="selectRole(UserRole.Investor)">Investor</base-button>
    </template>
  </base-modal>
</template>
<style scoped></style>