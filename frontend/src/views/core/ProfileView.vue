j<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { sendRequest } from '@/core/sendRequest'
import useAuthenticationStore from '@/stores/useAuthenticationStore'
import type User from '@/interfaces/user'
import type { RegistrableUser } from '@/interfaces/user'
import inputValidationRules from '@/helpers/inputValidationRules'
import { usePersonalDataForm } from '@/composables/usePersonalDataForm';

const store = useAuthenticationStore()
const { getUserId } = store
const initialUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: new Date(),
  userId: 0,
  profileImage: '/profilePlaceholder.jpg'
}
const initialModifiedUser: RegistrableUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordAgain: '',
  dateOfBirth: new Date(),
  profileImage: '/profilePlaceholder.jpg'
}

const user = ref<User>(initialUser)
const modifiedUser = ref<RegistrableUser>(initialModifiedUser)

const id = computed(() => getUserId)
const fullName = computed(() => `${user.value?.firstName} ${user.value.lastName}`)
const profileImageSource = computed(() => user.value.profileImage ?? '/profilePlaceholder.jpg')
const formattedDateOfBirth = computed(() =>
  user.value.dateOfBirth ? new Date(user.value?.dateOfBirth).toLocaleDateString('hu-HU') : null
)

const {
  personalData,
  passwordVisibility,
  validatePersonalData,
  togglePasswordVisibility,
  togglePasswordAgainVisibility,
  menu,
  handleDateChange,
  formattedDate,
} = usePersonalDataForm();

const fetchUser = async () => {
  if (id.value) {
    const response = await sendRequest(`user/${id.value}`, 'GET', undefined, undefined, true)
    user.value = response.user
    modifiedUser.value = {...response.user}
    modifiedUser.value.passwordAgain = {...response.user.password}
  }
}

const updateUser = async () => {
  if(!id.value) {
    throw new Error('Cannot update profile!');
  }
  
  const updatedUser = await sendRequest(`user/update/${id.value}`, 'PUT', modifiedUser.value, undefined, true)
  user.value = updatedUser.user
}

onMounted(fetchUser)
</script>
<template>
  <v-container class="profile">
    <v-img
      :width="128"
      :height="128"
      aspect-ratio="1/1"
      cover
      class="rounded-circle"
      :src="profileImageSource"
    />
    <v-card-title>{{ fullName }}</v-card-title>
    <base-card title="Personal data" :isEditable="true" :saveModification="updateUser">
      <template #content>
        <v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-email"></v-icon>
            <v-label>{{ user.email }}</v-label>
          </v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-lock"></v-icon>
            <v-label>...</v-label>
          </v-container>
          <v-container class="cardContentRow">
            <v-icon icon="mdi-calendar"></v-icon>
            <v-label>{{ formattedDateOfBirth }}</v-label>
          </v-container>
        </v-container>
      </template>
      <template #editContent>
        <v-container>
          <v-text-field
            label="First name"
            variant="outlined"
            v-model="modifiedUser.firstName"
            clearable
            :rules="[inputValidationRules.required]"
          />
          <v-text-field
            label="Last name"
            variant="outlined"
            v-model="modifiedUser.lastName"
            clearable
            :rules="[inputValidationRules.required]"
          />
          <v-text-field
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="modifiedUser.email"
            clearable
            type="email"
          />
          <v-text-field
            label="Password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="passwordVisibility.isPasswordVisible ? 'mdi-eye-closed' : 'mdi-eye'"
            v-model="modifiedUser.password"
            clearable
            :type="passwordVisibility.isPasswordVisible ? 'text' : 'password'"
            @click:append-inner="togglePasswordVisibility"
          />
          <v-text-field
            label="Password again"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="passwordVisibility.isPasswordAgainVisible ? 'mdi-eye-closed' : 'mdi-eye'"
            v-model="modifiedUser.password"
            clearable
            :type="passwordVisibility.isPasswordAgainVisible ? 'text' : 'password'"
            @click:append-inner="togglePasswordAgainVisibility"
          />
          <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedDate"
              label="Date of birth"
              append-inner-icon="mdi-calendar"
              variant="outlined"
              readonly
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="personalData.dateOfBirth"
            no-title
            @update:model-value="handleDateChange"
          ></v-date-picker>
        </v-menu>
        </v-container>
      </template>
      <!-- <v-date-input variant="outlined"></v-date-input> -->
    </base-card>
  </v-container>
</template>
<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

base-card .v-icon {
  color: var(--c-orange);
}

.cardContentRow {
  display: flex;
  padding: unset;
  gap: 0.5rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
