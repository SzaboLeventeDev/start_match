import type { Currency } from '@/interfaces/currency'
import type { Contact } from '@/interfaces/user'

export type ProjectCategory = {
  categoryId: number
  categoryName: string
  isLogicalDeleted: boolean
}
export type ProjectCategoryToAdd = Omit<ProjectCategory, 'categoryId'>

export type Project = {
  projectId: number
  projectName: string
  categoryId: number
  startDate: Date
  description: string
  contactId: number
  startingAmount: number
  currencyId: number
  isLogicalDeleted: boolean
  contact: Contact
  currency?: Currency
  category?: ProjectCategory
}

export type ProjectToAdd = Omit<Project, 'projectId' | 'currencyId' | 'categoryId'> & {
  currencyId: number | null
  categoryId: number | null
}
