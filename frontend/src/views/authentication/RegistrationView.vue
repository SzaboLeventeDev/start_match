<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import inputValidationRules from '@/helpers/inputValidationRules'
import { usePersonalDataForm } from '@/composables/usePersonalDataForm'

const {
  personalData,
  passwordVisibility,
  validatePersonalData,
  togglePasswordVisibility,
  togglePasswordAgainVisibility,
  menu,
  handleDateChange,
  formattedDate,
  saveUser,
} = usePersonalDataForm();

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
          v-model="personalData.firstName"
          clearable
          :rules="[inputValidationRules.required]"
        />
        <v-text-field
          label="Last name"
          variant="outlined"
          v-model="personalData.lastName"
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
            v-model="personalData.dateOfBirth"
            no-title
            @update:model-value="handleDateChange"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          label="Email"
          variant="outlined"
          v-model="personalData.email"
          type="email"
          clearable
          :rules="[inputValidationRules.email]"
        />
        <v-text-field
          label="Password"
          variant="outlined"
          v-model="personalData.password"
          :type="passwordVisibility.isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="passwordVisibility.isPasswordVisible ? 'mdi-eye-closed' : 'mdi-eye'"
          @click:append-inner="togglePasswordVisibility"
          clearable
          :rules="[inputValidationRules.required, inputValidationRules.passwordMinLength]"
        />
        <v-text-field
          label="Password again"
          variant="outlined"
          v-model="personalData.passwordAgain"
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
              inputValidationRules.passwordMatch(personalData.password, personalData.passwordAgain)
          ]"
        />
      </template>
      <template #actions>
        <base-button @click="saveUser" :disabled="!validatePersonalData(personalData)"
          >Registration</base-button
        >
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
