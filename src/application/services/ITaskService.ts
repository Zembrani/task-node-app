import { Task } from '../../domain/TaskDomain';

export type CreateTaskDTO = {
  title: string;
  description: string;
}

export interface ITaskService {
  getAll(): Promise<Task[]>;
  getTaskById(id: Task['id']): Promise<Task | null>;
  createTask(data: CreateTaskDTO): Promise<Task>;
  updateTask(id: Task['id'], task: Partial<Task>): Promise<Task | null>;
  deleteTask(id: Task['id']): Promise<void>
}