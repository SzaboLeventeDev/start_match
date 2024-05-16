<script setup lang="ts">
import { sendRequest } from '@/core/sendRequest';
import {UserRole} from '@/enums/userRole'
const selectRole = (userRoleId: number) => {
  sendRequest('/select-role', 'POST', {userRoleId})
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