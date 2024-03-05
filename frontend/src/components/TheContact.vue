<script setup lang="ts">
import { ref } from 'vue';

const email = ref<string>()
const categories = ref<string[]>(['Sponsorship Opportunities', 'User Feedback and Suggestions','Career Opportunities','General Inquiries'])
const category=ref<string>()
const message = ref<string>()

const sendForm = () => {
  console.log({email: email.value, category: category.value,message: message.value})
}
</script>
<template>
  <VContainer id="contact">
    <VForm class="form">
      <VCardTitle class="title">Contact us</VCardTitle>
      <VTextField label="Email"
      v-model="email" 
      outlined/>
      <VSelect label="Category of interest"
      v-model="category" 
      :items="categories" 
      />
      <VTextarea label="Message"
      v-model="message"/>
      <VBtn type="button" class="button" @click="sendForm">Send message</VBtn>
    </VForm>
  </VContainer>
</template>
<style scoped>
.title {
  text-align: center;
}

.form {
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