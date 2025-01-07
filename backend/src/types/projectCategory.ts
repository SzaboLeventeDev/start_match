import { ProjectCategoryAttributes } from '../models/projectCategory';

export type ProjectCategoryToAdd = Omit<ProjectCategoryAttributes, 'categoryId'>;
