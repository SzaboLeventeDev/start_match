import type { Project, ProjectCategory, ProjectCategoryToAdd, ProjectToAdd } from '@/types'
import type { Currency, CurrencyToAdd } from './currency'
import type { Ref } from 'vue'
import type { useCurrencyStore } from '@/stores/masterData/useCurrencyStore'
import type { useProjectCategoryStore } from '@/stores/masterData/useProjectCategoryStore'

export interface MasterDataStore {
  currencyStore: Ref<ReturnType<typeof useCurrencyStore> | null>
  projectCategoryStore: Ref<ReturnType<typeof useProjectCategoryStore> | null>
  getAndInitCurrencyStore: () => Promise<void>
  getAndInitProjectCategoryStore: () => Promise<void>
}

export interface CurrencyStore {
  currencies: Ref<Currency[]>
  currencyToSave: Ref<CurrencyToAdd | null>
  loadCurrencies: () => Promise<void>
  updateCurrency: (item: Currency) => Promise<void>
  addCurrency: () => void
  saveNewCurrency: () => Promise<void>
  cancelNewCurrency: () => void
}

export interface ProjectCategoryStore {
  projectCategories: Ref<ProjectCategory[]>
  projectCategoryToSave: Ref<ProjectCategoryToAdd | null>
  loadProjectCategories: () => Promise<void>
  updateProjectCategory: (item: ProjectCategory) => Promise<void>
  addProjectCategory: () => void
  saveNewProjectCategory: () => Promise<void>
  cancelNewProjectCategory: () => Promise<void>
}

export interface ProjectStore {
  myProjects: Ref<Project[]>
  projectToSave: Ref<ProjectToAdd | null>
  loadMyProjects: () => Promise<void>
  updateProject: (item: Project) => Promise<void>
  addProject: () => void
  saveNewProject: () => Promise<void>
  cancelNewProject: () => void
  getProject: (projectId: number) => Project | undefined
}
