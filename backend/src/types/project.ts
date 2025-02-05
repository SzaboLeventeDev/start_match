import { ProjectAttributes } from '../models/project';

export type ProjectToAdd = Omit<ProjectAttributes, 'projectId'>;
