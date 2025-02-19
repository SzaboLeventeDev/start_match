import { sequelizeToResponseArrayHelper, sequelizeToResponseHelper } from '../../helper/sequelizeToResponseHelper';
import { Project, ProjectAttributes } from '../../models/project';
import { ProjectToAdd } from '../../types/project';
import logger from '../../logger';
import { User } from '../../models/user';
import { Currency } from '../../models/currency';
import { ProjectCategory } from '../../models/projectCategory';

export const getMyProjects = async (userId: number): Promise<ProjectAttributes[]> => {
  const records = await Project.findAll({ where: { contactId: userId }, include: [{ model: User, as: 'contact' }, { model: Currency }, { model: ProjectCategory, as: 'category' }] });
  return sequelizeToResponseArrayHelper<ProjectAttributes>(records);
};

export const addProject = async (project: ProjectToAdd): Promise<ProjectAttributes> => {
  const record = await Project.create({
    projectName: project.projectName,
    categoryId: project.categoryId,
    startDate: project.startDate,
    description: project.description,
    contactId: project.contactId,
    startingAmount: project.startingAmount,
    currencyId: project.currencyId,
    isLogicalDeleted: project.isLogicalDeleted,
  });

  return record.get({ plain: true });
};

export const updateProject = async (project: ProjectAttributes): Promise<ProjectAttributes | null> => {
  const [affectedCount] = await Project.update(project, { where: { projectId: project.projectId } });

  if (affectedCount === 0) {
    logger.error(`Failed to update the project with ID: ${project.projectId}`);
    return null;
  }
  const updatedProject = await Project.findOne({ where: { projectId: project.projectId } });

  if (!updatedProject) return null;
  return sequelizeToResponseHelper<ProjectAttributes>(updatedProject, ['projectId', 'categoryId', 'contactId', 'currencyId', 'description', 'projectName', 'startDate', 'startingAmount']);
};

export const deleteProject = async (projectId: number): Promise<boolean> => {
  const projectRow = await Project.findOne({ where: { projectId } });

  if (!projectRow) {
    logger.error(`Project with ID: ${projectId} not found to delete.`);
    return false;
  }

  const [affectedCount] = await Project.update({ isLogicalDeleted: true }, { where: { projectId } });

  if (affectedCount === 0) {
    logger.error(`Delete project width ID: ${projectId} was not successful`);
    return false;
  }

  return true;
};
