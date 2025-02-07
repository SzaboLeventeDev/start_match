<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue';
import { useProjectStore } from '@/stores/useProjectStore';
import { storeToRefs } from 'pinia';
import type { Project, ProjectCategory } from '@/types';
import BaseDateSelector from '@/components/ui/BaseDateSelector.vue';
import { DATE_FORMAT_HINT } from '@/constants/constants';
import { useMasterDataStore } from '@/stores/masterData/useMasterDataStore';
import type { Currency, CurrencyToAdd } from '@/interfaces/currency';
import { RouterLink } from 'vue-router';
const masterDataStore = useMasterDataStore();
const {currencyStore, projectCategoryStore} = storeToRefs(masterDataStore)

const projectStore = useProjectStore();
const {myProjects, projectToSave} = storeToRefs(projectStore)
const { addProject, updateProject, saveNewProject, cancelNewProject } = projectStore

const currencies = computed(() => currencyStore?.value?.currencies ?? [])
const projectCategories = computed(() => projectCategoryStore?.value?.projectCategories ?? [])

const newProjectStartDateFormatted = computed({
  get: (): string => {
    // Ha `project.startDate` nem null vagy undefined, akkor ISO string-ként tér vissza
    if (projectToSave.value?.startDate) {
      return projectToSave.value.startDate.toISOString().substring(0, 10); // Csak a dátum
    }
    return '';
  },
  set: (value: string) => {
    // Validáció, hogy az érték helyes formátumú dátum-e
    if(value.length < 10)return
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      projectToSave.value!.startDate = parsedDate;
    } else {
      console.warn('Érvénytelen dátumformátum:', value);
    }
  },
});


onMounted(async () => {
  await projectStore.loadMyProjects()
  await masterDataStore.getAndInitCurrencyStore()
  await masterDataStore.getAndInitProjectCategoryStore()
  await nextTick()
  console.log({currencies: currencies.value})
})

const saveProjectHandler = (project: Project): void => {
  project.projectId ? updateProject(project) : saveNewProject()
}

</script>
<template>
  <v-container class="myProjectsHeader">
    <h1>My Projects</h1>
    <v-btn class="addProjectBtn" rounded="xl" @click="addProject">+</v-btn>
  </v-container>
  <v-card v-if="projectToSave" class="newProjectCard">
    <v-text-field label="Project name" v-model="projectToSave.projectName" variant="outlined" />
    <v-combobox 
      label="Category" 
      variant="outlined" 
      :items="projectCategories" 
      item-title="categoryName" 
      item-value="categoryId" 
      v-model="projectToSave.categoryId" 
      :return-object="false"
    />
    <v-text-field label="Starting price" 
                  type="number"
                  v-model.number="projectToSave.startingAmount" 
                  variant="outlined" />
    <v-combobox label="Currency" variant="outlined" :items="currencies" item-title="name" item-value="currencyId" v-model="projectToSave.currencyId" :return-object="false"></v-combobox>
    <v-text-field label="Start date" :hint="DATE_FORMAT_HINT" v-model="newProjectStartDateFormatted" variant="outlined"/>
    <v-container class="buttonWrapper">
      <base-button @click="saveNewProject">save</base-button>
      <base-button @click="cancelNewProject">cancel</base-button>
    </v-container>
  </v-card>
  <v-container class="projectListWrapper">
    <router-link v-for="project in myProjects" 
              :key="project.projectId" :to="{name: 'mySelectedProject', params: {'projectId': project.projectId}}">
    <base-card 
              :title="project.projectName" 
              :isEditable="false" 
              :saveModification="() => saveProjectHandler(project)">
    <template #content>
      <v-card-text>{{ project.startingAmount }} {{ project.currency?.code }}</v-card-text>
    </template>
    <!-- <template #editContent>
      <v-container>
        <v-text-field label="Project name" 
                      v-model="project.projectName" 
                      variant="outlined" />
        <v-combobox label="Category" 
                    variant="outlined" 
                    :items="projectCategories" 
                    item-title="categoryName" 
                    item-value="categoryId" 
                    v-model="project.categoryId"/>
        <v-text-field label="Starting price" 
                      type="number"
                      v-model.number="project.startingAmount" 
                      variant="outlined" />
        <v-combobox label="Currency" 
                    variant="outlined" 
                    :items="currencies"
                    item-title="name" 
                    item-value="currencyId"
                    v-model="project.currencyId"/>
        <v-text-field
          label="Start date"
          :hint="DATE_FORMAT_HINT"
          v-model="project.startDate"
          variant="outlined"
        />
        <v-checkbox label="Deleted" v-model="project.isLogicalDeleted"/>
      </v-container>
    </template> -->
    </base-card>
    </router-link>
  </v-container>
</template>
<style scoped lang="css">
.myProjectsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: var(--c-orange);
}
.addProjectBtn {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--c-orange);
  background-color: var(--c-blue);
  color: var(--c-white);
}

.newProjectCard{
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

.projectListWrapper {
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

.projectListWrapper > a {
  text-decoration: none;
  cursor: pointer;
}
</style>