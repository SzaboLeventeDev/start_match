import { sendRequest } from '@/core/sendRequest'
import type { ProjectCategoryStore } from '@/interfaces/stores'
import type { ProjectCategory, ProjectCategoryToAdd } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectCategoryStore = defineStore('projectCategory', (): ProjectCategoryStore => {
  const baseUrl = 'master-data/project-category'

  const projectCategories = ref<ProjectCategory[]>([])
  const projectCategoryToSave = ref<ProjectCategoryToAdd | null>(null)

  const loadProjectCategories = async (): Promise<void> => {
    projectCategories.value = await sendRequest(`${baseUrl}/all`, 'GET', undefined, undefined, true)
  }

  const updateProjectCategory = async (item: ProjectCategory): Promise<void> => {
    const { projectCategory } = await sendRequest(
      `${baseUrl}/update/${item.categoryId}`,
      'PUT',
      item,
      undefined,
      true
    )

    if (projectCategory) {
      const indexOfProjectCategory = projectCategories.value.findIndex(
        (category) => category.categoryId === item.categoryId
      )

      if (indexOfProjectCategory !== -1) {
        projectCategories.value[indexOfProjectCategory] = projectCategory
      }
    }
  }

  const addProjectCategory = async (): Promise<void> => {
    projectCategoryToSave.value = {
      categoryName: '',
      isLogicalDeleted: false
    }
  }

  const saveNewProjectCategory = async (): Promise<void> => {
    if (projectCategoryToSave.value !== null) {
      const { 'project-category': projectCategory } = await sendRequest(
        `${baseUrl}/add`,
        'POST',
        projectCategoryToSave.value,
        undefined,
        true
      )

      if (projectCategory) {
        projectCategories.value.push(projectCategory)
        projectCategoryToSave.value = null
      }
    }
  }

  const cancelNewProjectCategory = async (): Promise<void> => {
    projectCategoryToSave.value = null
  }

  return {
    projectCategories,
    projectCategoryToSave,
    loadProjectCategories,
    updateProjectCategory,
    addProjectCategory,
    saveNewProjectCategory,
    cancelNewProjectCategory
  }
})
