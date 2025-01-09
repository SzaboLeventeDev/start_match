export type ProjectCategory = {
  categoryId: number
  categoryName: string
  isLogicalDeleted: boolean
}
export type ProjectCategoryToAdd = Omit<ProjectCategory, 'categoryId'>
