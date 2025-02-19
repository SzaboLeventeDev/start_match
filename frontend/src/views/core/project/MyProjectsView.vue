<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'
import { storeToRefs } from 'pinia'
import type { Project } from '@/types'
import { RouterLink } from 'vue-router'
import useAuthenticationStore from '@/stores/useAuthenticationStore'

const projectStore = useProjectStore()
const { myProjects } = storeToRefs(projectStore)
const { updateProject, saveNewProject } = projectStore

const authStore = useAuthenticationStore();
const { getUserId } = authStore;

onMounted(async () => {
  const userId = getUserId

  if(userId !== null) {
    await projectStore.loadMyProjects(userId)
  }
})

const saveProjectHandler = (project: Project): void => {
  project.projectId ? updateProject(project) : saveNewProject()
}
</script>
<template>
  <v-container class="myProjectsHeader">
    <h1>My Projects</h1>
    <router-link :to="{ name: 'addNewProject' }">
      <v-btn class="addProjectBtn" rounded="xl">+</v-btn>
    </router-link>
  </v-container>
  <v-container class="projectListWrapper">
    <router-link
      v-for="project in myProjects"
      :key="project.projectId"
      :to="{ name: 'mySelectedProject', params: { projectId: project.projectId } }"
    >
      <base-card
        :title="project.projectName"
        :isEditable="false"
        :saveModification="() => saveProjectHandler(project)"
      >
        <template #content>
          <v-card-text>{{ project.startingAmount }} {{ project.currency?.code }}</v-card-text>
        </template>
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
