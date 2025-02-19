import { NextFunction, Request, Response } from 'express';
import { addProject, deleteProject, getMyProjects, updateProject } from '../../services/core/projectService';

interface ProjectController {
  getMyProjects: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addProject: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateProject: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteProject: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  discoverProjects: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const projectController: ProjectController = {
  async getMyProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.query.userId);
      if (!userId || isNaN(userId) || userId <= 0) {
        res.status(400).json({ message: 'Invalid user ID!' });
      }

      const projects = await getMyProjects(userId);

      if (!projects) {
        res.status(404).json({ message: 'No projects found!' });
        return;
      }

      res.status(200).json({ message: 'Projects sent successfully', projects });
    } catch (error) {
      next(error);
    }
  },
  async addProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await addProject(req.body);

      if (!project) {
        res.status(400).json({ message: 'Saving new project failed!' });
        return;
      }

      res.status(201).json({ message: 'Saving new project is successful!', project });
    } catch (error) {
      next(error);
    }
  },
  async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedProject = await updateProject(req.body);

      if (!updateProject) {
        res.status(304).json({ message: 'Project has not modified!' });
      }
      res.status(200).json({ message: 'Update project is successful!', project: updatedProject });
    } catch (error) {
      next(error);
    }
  },
  async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const isDeleteSuccessful = await deleteProject(req.body);

      if (!isDeleteSuccessful) {
        res.status(304).json({ message: 'Deleting project failed!' });
        return;
      }
      res.status(200).json({ message: 'Project deleted successfully!' });
    } catch (error) {
      next(error);
    }
  },

  async discoverProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  },
};
