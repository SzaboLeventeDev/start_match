<script setup lang="ts">
import { computed } from 'vue';
import { usePersonalDataForm } from '@/composables/usePersonalDataForm';
import inputValidationRules from '@/helpers/inputValidationRules';

const props = defineProps<{
  "title": string,
}>();

const {
  personalData,
  passwordVisibility,
  validatePersonalData,
  togglePasswordVisibility,
  togglePasswordAgainVisibility,
  menu,
  handleDateChange,
} = usePersonalDataForm();

const formattedDate = computed(() => personalData.value.dateOfBirth.toISOString().slice(0, 10))
</script>
<template>
  <base-form>
      <template #title>
        <v-card-title>{{ props.title }}</v-card-title>
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
        <base-button @click="registrateUser" :disabled="!validatePersonalData(personalData)"
          >Registration</base-button
        >
      </template>
    </base-form>
</template>
<style scoped></style>