<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref } from 'vue'
import type { RegistrableUser } from '@/interfaces/user'
import { sendRequest } from '@/core/sendRequest'
import { computed } from 'vue'
import inputValidationRules from '@/helpers/inputValidationRules'

const registrationData = ref<RegistrableUser>({
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  email: '',
  password: '',
  passwordAgain: ''
})

const passwordVisibility = ref<{
  isPasswordVisible: boolean
  isPasswordAgainVisible: boolean
}>({ isPasswordVisible: false, isPasswordAgainVisible: false })

const menu = ref<boolean>(false)

const validateRegistrationData = (registrationData: RegistrableUser): boolean => {
  if(!registrationData.firstName || registrationData.firstName === '') return false

  if(!registrationData.lastName || registrationData.lastName === '') return false

  if(!registrationData.email.includes('@')) return false

  if(registrationData.password.length < 8) return false

  if(registrationData.passwordAgain.length < 8 || registrationData.password !== registrationData.passwordAgain) return false

  return true
}

const registrateUser = async (): Promise<string> => {
  const message = await sendRequest('registration', 'POST', registrationData.value)
  return message
}

const togglePasswordVisibility = () => {
  passwordVisibility.value.isPasswordVisible = !passwordVisibility.value.isPasswordVisible
}

const togglePasswordAgainVisibility = () => {
  passwordVisibility.value.isPasswordAgainVisible = !passwordVisibility.value.isPasswordAgainVisible
}

const handleDateChange = (value: Date) => {
  const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  registrationData.value.dateOfBirth = utcDate;
  menu.value = false;
}


const formattedDate = computed(() => registrationData.value.dateOfBirth.toISOString().slice(0, 10))
</script>
<template>
  <v-container class="registrationView">
    <base-form>
      <template #title>
        <v-card-title>Registration</v-card-title>
      </template>
      <template #content>
        <v-text-field
          label="First name"
          variant="outlined"
          v-model="registrationData.firstName"
          clearable
          :rules="[inputValidationRules.required]"
        />
        <v-text-field
          label="Last name"
          variant="outlined"
          v-model="registrationData.lastName"
          clearable
          :rules="[inputValidationRules.required]"
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
            v-model="registrationData.dateOfBirth"
            no-title
            @update:model-value="handleDateChange"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          label="Email"
          variant="outlined"
          v-model="registrationData.email"
          type="email"
          clearable
          :rules="[inputValidationRules.email]"
        />
        <v-text-field
          label="Password"
          variant="outlined"
          v-model="registrationData.password"
          :type="passwordVisibility.isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="passwordVisibility.isPasswordVisible ? 'mdi-eye-closed' : 'mdi-eye'"
          @click:append-inner="togglePasswordVisibility"
          clearable
          :rules="[inputValidationRules.required, inputValidationRules.passwordMinLength]"
        />
        <v-text-field
          label="Password again"
          variant="outlined"
          v-model="registrationData.passwordAgain"
          :type="passwordVisibility.isPasswordAgainVisible ? 'text' : 'password'"
          :append-inner-icon="
            passwordVisibility.isPasswordAgainVisible ? 'mdi-eye-closed' : 'mdi-eye'
          "
          @click:append-inner="togglePasswordAgainVisibility"
          clearable
          :rules="[
            inputValidationRules.required,
            inputValidationRules.passwordMinLength,
            () =>
              inputValidationRules.passwordMatch(
                registrationData.password,
                registrationData.passwordAgain
              )
          ]"
        />
      </template>
      <template #actions>
        <base-button @click="registrateUser" :disabled="!validateRegistrationData(registrationData)">Registration</base-button>
      </template>
    </base-form>
  </v-container>
</template>
<style scoped>
.registrationView {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

form button {
  margin: auto;
}

@media (min-width: 768px) {
  form {
    width: 400px;
  }
}
</style>
