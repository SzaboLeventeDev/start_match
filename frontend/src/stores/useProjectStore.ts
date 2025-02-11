import { sendRequest } from '@/core/sendRequest'
import type { ProjectStore } from '@/interfaces/stores'
import type { Project, ProjectToAdd } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAuthenticationStore from './useAuthenticationStore'

export const useProjectStore = defineStore('project', (): ProjectStore => {
  let myProjects = ref<Project[]>([])
  let projectToSave = ref<ProjectToAdd | null>(null)
  let originalProjectWhileEdit = ref<Project | null>(null)

  const loadMyProjects = async (): Promise<void> => {
    const { projects } = await sendRequest('project/my-projects', 'GET', undefined, undefined, true)
    myProjects.value = projects
  }

  const updateProject = async (item: Project): Promise<Project> => {
    console.log('update project')
    const { project, error } = await sendRequest(
      `project/update/${item.projectId}`,
      'PUT',
      item,
      undefined,
      true
    )

    if (error) {
      throw Error(error)
    }

    myProjects.value.push(project)
    return project
  }

  const addProject = (): void => {
    console.log('add new project')
    const authenticationStore = useAuthenticationStore()
    projectToSave.value = {
      projectName: '',
      description: '',
      currencyId: null,
      contactId: authenticationStore.getUserId!,
      startDate: new Date(Date.now()),
      startingAmount: 0,
      isLogicalDeleted: false,
      categoryId: null,
      contact: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  }

  const saveNewProject = async (): Promise<Project> => {
    if (projectToSave.value !== null) {
      const { project, error } = await sendRequest(
        'project/add',
        'POST',
        projectToSave.value,
        undefined,
        true
      )

      if (error) {
        throw Error(error)
      }

      myProjects.value.push(project)
      projectToSave.value = null
      return project
    }
    throw Error('No project to save!')
  }

  const cancelNewProject = (): void => {
    projectToSave.value = null
  }

  const getProject = (projectId: number): Project | undefined => {
    return myProjects.value.find((project) => project.projectId === projectId)
  }

  /**
   * @function handleCopyProjectBeforeEdit
   * @description Save a deep copy of the project object before the edition. Before saving the updated item and the originalProjectWhiteEdit will be compared.
   * @param item The opened project
   * @returns void
   */
  const handleCopyProjectBeforeEdit = (item: Project): void => {
    originalProjectWhileEdit.value = { ...item }
  }
  return {
    myProjects,
    projectToSave,
    originalProjectWhileEdit,
    loadMyProjects,
    updateProject,
    addProject,
    saveNewProject,
    cancelNewProject,
    getProject,
    handleCopyProjectBeforeEdit
  }
})
