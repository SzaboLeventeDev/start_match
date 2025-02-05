import { sendRequest } from '@/core/sendRequest'
import type { ProjectStore } from '@/interfaces/stores'
import type { Project, ProjectToAdd } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAuthenticationStore from './useAuthenticationStore'

export const useProjectStore = defineStore('project', (): ProjectStore => {
  let myProjects = ref<Project[]>([])
  let projectToSave = ref<ProjectToAdd | null>(null)

  const loadMyProjects = async (): Promise<void> => {
    const { projects } = await sendRequest('project/my-projects', 'GET', undefined, undefined, true)
    myProjects.value = projects
  }

  const updateProject = async (item: Project): Promise<void> => {
    const { project } = await sendRequest(
      `project/update/${item.projectId}`,
      'PUT',
      item,
      undefined,
      true
    )

    if (project) myProjects.value.push(project)
  }

  const addProject = (): void => {
    const authenticationStore = useAuthenticationStore()
    projectToSave.value = {
      projectName: '',
      description: '',
      currencyId: null,
      contactId: authenticationStore.getUserId!,
      startDate: new Date(Date.now()),
      startingAmount: 0,
      isLogicalDeleted: false,
      categoryId: null
    }
  }

  const saveNewProject = async (): Promise<void> => {
    if (projectToSave.value !== null) {
      const { project } = await sendRequest(
        'project/add',
        'POST',
        projectToSave.value,
        undefined,
        true
      )
      if (project) {
        myProjects.value.push(project)
        projectToSave.value = null
      }
    }
  }

  const cancelNewProject = (): void => {
    projectToSave.value = null
  }

  const getProject = (projectId: number): Project | undefined => {
    return myProjects.value.find((project) => project.projectId === projectId)
  }
  return {
    myProjects,
    projectToSave,
    loadMyProjects,
    updateProject,
    addProject,
    saveNewProject,
    cancelNewProject,
    getProject
  }
})
