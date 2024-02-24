<script setup lang="ts">
import { ref } from 'vue'

const content = ref({
  title: 'Welcome here!',
  topics: [
    {
      description:
        'Welcome to SmartMatch, the cutting-edge online platform dedicated to fostering connections between innovative startups and astute investors. Our mission is to create a vibrant ecosystem where entrepreneurial vision and investment insight come together, fostering a thriving environment for business growth and innovation. At SmartMatch, we recognize the unique challenges involved in the search for the perfect business match in the dynamic world of startups and investment. Therefore, we have meticulously designed a user-friendly, secure, and highly efficient platform that caters to the specific needs of startups in search of funding and investors on the lookout for groundbreaking new ventures.',
      image: { src: './landing/introduction-1.jpg', alt: 'test image 1' }
    },
    {
      description:
        'Our platform boasts an intuitive interface that enables startups to effectively showcase their innovative ideas, robust business models, and potential for growth. We equip these emerging companies with a range of tools and resources, assisting them in presenting their vision, highlighting their key strengths, and communicating their market potential with clarity and impact. For investors, SmartMatch is a gateway to a world of opportunities. We present a carefully curated collection of high-potential startups, each rigorously vetted for quality and growth prospects. Our sophisticated matching algorithm is designed to ensure that investors discover startups that resonate with their specific investment strategies, paving the way for impactful and enduring partnerships. Become a part of SmartMatch today and join a community that is actively shaping the future of business and innovation.',
      image: { src: './landing/introduction-2.jpg', alt: 'test image 2' }
    }
  ]
})
</script>
<template>
  <VContainer id="introduction">
    <VCardTitle class="title">{{ content.title }}</VCardTitle>
    <VContainer>
      <VRow v-for="(topic, index) in content.topics" :class="{ reverse: index % 2 !== 0 }">
        <VCol cols="12" md="6">
          <VLabel
            class="description"
            :class="{ animateFromLeft: index % 2 === 0, animateFromRight: index % 2 !== 0 }"
            >{{ topic.description }}</VLabel
          >
        </VCol>
        <VCol cols="12" md="6" class="colPosition">
          <VImg
            :src="topic.image.src"
            :alt="topic.image.alt"
            class="descriptionImage"
            :class="{ animateFromLeft: index % 2 !== 0, animateFromRight: index % 2 === 0 }"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>
<style scoped>
#introduction {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
.title {
  text-align: center;
}

.description {
  text-wrap: wrap;
  text-align: justify;
}

.reverse {
  display: flex;
  flex-direction: row-reverse;
}
.descriptionImage {
  border-radius: 1rem;
  @media (min-width: 960px) {
    max-width: 20rem;
    height: auto;
  }
}

.colPosition {
  display: flex;
  align-items: center;
  justify-content: center;
}

.animateFromLeft {
  animation: slideFromLeft 0.5s ease-in;
}

.animateFromRight {
  animation: slideFromRight 0.5s ease-in;
}
@media (min-width: 960px) {
  .v-container {
    max-width: unset;
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
