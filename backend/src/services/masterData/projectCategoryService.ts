import { where } from 'sequelize';
import { sequelizeToResponseArrayHelper, sequelizeToResponseHelper } from '../../helper/sequelizeToResponseHelper';
import { Project } from '../../models/project';
import { ProjectCategory, ProjectCategoryAttributes } from '../../models/projectCategory';
import { ProjectCategoryToAdd } from '../../types/projectCategory';

export const getProjectCategories = async (): Promise<ProjectCategoryAttributes[]> => {
  const records = await ProjectCategory.findAll();
  const projectCategories = sequelizeToResponseArrayHelper<ProjectCategoryAttributes>(records);

  return projectCategories;
};

export const addProjectCategory = async (projectCategory: ProjectCategoryToAdd): Promise<ProjectCategoryAttributes> => {
  const record = await ProjectCategory.create({ projectCategory });
  return record.get({ plain: true });
};

export const updateProjectCategory = async (projectCategory: ProjectCategoryAttributes): Promise<ProjectCategoryAttributes | null> => {
  const [affectedCount] = await ProjectCategory.update(projectCategory, {
    where: {
      categoryId: projectCategory.categoryId,
    },
  });

  if (affectedCount === 0) return null;

  const updatedProjectCategory = await ProjectCategory.findOne({ where: { categoryId: projectCategory.categoryId } });

  if (!updatedProjectCategory) return null;
  const result = sequelizeToResponseHelper<ProjectCategoryAttributes>(updatedProjectCategory, ['categoryId', 'categoryName', 'isLogicalDeleted']);
  return result;
};

export const deleteProjectCategory = async (categoryId: number): Promise<void> => {
  await ProjectCategory.update({ isLogicalDeleted: true }, { where: { categoryId } });
};
