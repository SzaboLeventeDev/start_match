<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useMasterDataStore } from '@/stores/masterData/useMasterDataStore';
import { storeToRefs } from 'pinia';
import type { ProjectCategory } from '@/types';
import inputValidationRules from '@/helpers/inputValidationRules';

const masterDataStore = useMasterDataStore();
const {projectCategories, projectCategoryToSave } = storeToRefs(masterDataStore.projectCategoryStore!);
const {updateProjectCategory, addProjectCategory, saveNewProjectCategory, cancelNewProjectCategory} = masterDataStore.projectCategoryStore!;

const saveProjectCategoryHandler = (projectCategory: ProjectCategory): void => {
  projectCategory.categoryId === undefined ? saveNewProjectCategory() : updateProjectCategory(projectCategory);
}

</script>
<template>
  <router-view />
  <v-container class="projectCategoriesHeader">
    <h1>Project categories</h1>
    <v-btn class="addProjectCategoryBtn" rounded="xl" @click="addProjectCategory">+</v-btn>
  </v-container>
  <v-container v-if="projectCategoryToSave" class="newProjectCategoryCard">
    <v-card>
      <v-text-field label="Project category name" v-model="projectCategoryToSave.categoryName" :rules="[inputValidationRules.masterData.projectCategory.projectCategoryName]"</v-text-field>/>
      <v-container class="buttonWrapper">
      <base-button @click="saveNewProjectCategory">save</base-button>
      <base-button @click="cancelNewProjectCategory">cancel</base-button>
    </v-container>
    </v-card>
  </v-container>
  <v-container class="projectCategoryListWrapper">
    <base-card v-for="projectCategory in projectCategories" :key="projectCategory.categoryId" :title="projectCategory.categoryName" 
    :isEditable="true"
    :saveModification="() => saveProjectCategoryHandler(projectCategory)">
      <template #editContent>
        <v-text-field label="Project category" v-model="projectCategory.categoryName" :rules="[inputValidationRules.masterData.projectCategory.projectCategoryName]"/>
        <v-checkbox label="Deleted" v-model="projectCategory.isLogicalDeleted"/>
      </template>
    </base-card>
  </v-container>
</template>
<style scoped>
.projectCategoriesHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: var(--c-orange);
}

.addProjectCategoryBtn {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--c-orange);
  background-color: var(--c-blue);
  color: var(--c-white);
}

.newProjectCategoryCard{
  width: 70vw;
  margin: auto;
  border: 1px solid var(--c-orange);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  padding: .5rem;
  @media(min-width: 768px) {
    gap: 1rem;
    flex-direction: row;
    align-items: center;
  }
}

.projectCategoryListWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.v-card {
  @media (min-width: 768px) {
    width: unset;
  }
}

.buttonWrapper {
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  gap: 1rem;
  }

</style>