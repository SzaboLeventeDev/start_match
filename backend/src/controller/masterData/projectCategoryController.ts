import { Request, Response, NextFunction } from 'express';
import { addProjectCategory, deleteProjectCategory, getProjectCategories, updateProjectCategory } from '../../services/masterData/projectCategoryService';

interface ProjectCategoryControllerAttributes {
  getProjectCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addProjectCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateProjectCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteProjectCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const projectCategoryController: ProjectCategoryControllerAttributes = {
  async getProjectCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectCategories = await getProjectCategories();

      if (projectCategories.length === 0) {
        res.status(204).send();
        return;
      }

      res.status(200).json(projectCategories);
    } catch (error) {
      next(error);
    }
  },
  async addProjectCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await addProjectCategory(req.body);

      if (!result) {
        res.status(400).json({ message: 'Saving new project category failed!' });
        return;
      }

      res.status(201).json({ message: 'Saving new project category successfully!', 'project-category': result });
    } catch (error) {
      next(error);
    }
  },
  async updateProjectCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await updateProjectCategory(req.body);

      if (!result) {
        res.status(304).json({ message: 'Project category has not modified!' });
      }

      res.status(200).json({ message: 'Update project category is successful!', 'project-category': result });
    } catch (error) {
      next(error);
    }
  },
  async deleteProjectCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await deleteProjectCategory(req.body);
      res.status(200).json({ message: 'Project category deleted successfully!' });
    } catch (error) {
      next(error);
    }
  },
};
