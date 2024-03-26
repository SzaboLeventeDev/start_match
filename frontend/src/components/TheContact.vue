<script setup lang="ts">
import { sendRequest } from '../core/sendRequest';
import { ref } from 'vue';

const email = ref<string>()
const categories = ref<string[]>(['Sponsorship Opportunities', 'User Feedback and Suggestions','Career Opportunities','General Inquiries'])
const category=ref<string>()
const message = ref<string>()

const sendForm = async() => {
  const payload = {
    email: email.value,
    category: category.value,
    message: message.value
  }
  const response = await sendRequest('enquiry', 'POST', payload)

  const { message: errorMessage , enquiry } = response

  return errorMessage ? errorMessage : enquiry
}

</script>
<template>
  <VContainer id="contact">
    <VForm class="form">
      <VCardTitle class="title">Contact us</VCardTitle>
      <VTextField label="Email"
      v-model="email" 
      variant="outlined" 
      clearable/>
      <VSelect label="Category of interest"
      v-model="category" 
      :items="categories" 
      variant="outlined"
      clearable
      />
      <VTextarea label="Message"
      v-model="message"
      variant="outlined"
      clearable />
      <VBtn type="button" class="button" @click="sendForm" data-test-id="formButton">Send message</VBtn>
    </VForm>
  </VContainer>
</template>
<style scoped>
.title {
  text-align: center;
}

.form {
  max-width: 800px;
  margin: auto;
  border: 1px solid var(--c-grey);
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--c-light-blue)

}

.button {
  display: flex;
  align-items: center;
}
</style>