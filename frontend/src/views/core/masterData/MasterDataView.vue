<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>
<template>
  <h1 class="pageTitle">Master data manager</h1>
  <v-container>
    <v-container class="tileWrapper">
      <router-link :to="{ name: 'currencies' }">
        <v-container class="tile">
          <v-icon icon="mdi-cash" end/>
          <h2>Currencies</h2>
        </v-container>
      </router-link>
      <router-link :to="{ name: 'projectCategories'}">
        <v-container class="tile">
          <v-icon icon="mdi-type" />
          <h2>Project Categories</h2>
        </v-container>
      </router-link>
    </v-container>
      <router-view />
    </v-container>
</template>
<style scoped lang="css">
.pageTitle {
  color: var(--c-orange);
}

a {
  text-decoration: none;
}

.tileWrapper {
  display: flex;
  gap: 1rem;
}

.tile {
  width: 9rem;
  height: 9rem;
  padding: 0.5rem;
  color: var(--c-orange);
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border: 1px solid var(--c-orange);
  border-radius: 1rem;

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }

  @media (min-width: 1024px) {
    width: 15rem;
  height: 15rem;
  }
}

.v-icon{
  font-size: 5rem;

  @media (min-width: 768px) {
    font-size: 7rem;
  }

  @media (min-width: 1024px) {
    font-size: 10rem;
  }
}
</style>