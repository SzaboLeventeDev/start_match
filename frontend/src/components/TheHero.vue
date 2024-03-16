<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseButton from './ui/BaseButton.vue';

const initialValues = ['test1', 'test2', 'test3']
const moreDetails = 'For more details, please scroll down or use the arrow button!'

const heroIntro = ref<string[]>([])
const heroDetails = ref<string>()

const startBouncing = (event: AnimationEvent) => {
  const slideInRegex = /^slideIn-/; // text contains slideIn at the beginning
  if(slideInRegex.test(event.animationName)) {
    (event.target as HTMLElement).classList.add('bouncing')
  }
}

onMounted(() => {
  // load and animate initial values
  initialValues.forEach((text, index) => {
    setTimeout(() => {
      heroIntro.value.push(text)
    }, index*800)
  })

  // load details after the first animation
  setTimeout(() => {
    heroDetails.value = moreDetails
  }, initialValues.length * 800)
})
</script>
<template>
  <VContainer  class="hero">
    <TransitionGroup name="slide" tag="div" class="transition">
      <VLabel v-for="(text, index,) in heroIntro" class="intro" :key="index">{{ text }}</VLabel>
    </TransitionGroup>
    <VContainer v-if="heroDetails" class="detailsWrapper">
      <VLabel class="details">{{ heroDetails }}</VLabel>
      <BaseButton :rounded="true" 
      class="bounce"
      @animationend="startBouncing">
      <VIcon icon="mdi-arrow-down"/>
    </BaseButton>
  </VContainer>
  </VContainer>
</template>
<style scoped>
.hero {
  margin: 0;
  padding: 6rem 0;
  width: 100%;
  height: 100vh;
  background-color: var(--c-light-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--c-orange);
}

.hero .transition {
  display: flex;
  flex-direction: column;
}
.hero .intro {
  font-size: 3rem;
}

.detailsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.details {
  width: 70%;
  text-wrap: wrap;
  text-align: center;
  margin: 2rem auto;
  animation: slideInFromRight .6s ease-in;
  display: flex;
  justify-content: center;
}

.bounce {
  animation: slideIn .6s ease-in;
  color: var(--c-light-blue);
}
.bouncing {
  animation: bounce 2s ease-in-out infinite;
}

@media (min-width: 768px) {
  .v-container {
    max-width: none;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(8rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%,100% {
    transform: translateY(0);
  }
  
  50% {
    transform: translateY(-20px);
  }
  
}
.slide-enter-active, .slide-leave-active {
  animation: slideIn 0.4s ease-in both;
  animation-delay: calc(var(--index) * 1s);
}
</style>
