import { ITaskRepository } from '../repositories/ITaskRepository';
import { CreateTaskDTO, ITaskService } from './ITaskService';
import { Task } from '../../domain/TaskDomain';

export class TaskService implements ITaskService {
    constructor(private taskRepository: ITaskRepository) {}

    async getAll(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }

    async createTask(data: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.create(data);
    }

    async getTaskById(id: Task['id']): Promise<Task | null> {
        const existingTask = await this.taskRepository.getTaskById(id);

        if(!existingTask) {
            return null;
        }
        return existingTask;
    }

    async updateTask(id: Task['id'], task: Task): Promise<Task | null> {
        const existingTask = await this.taskRepository.getTaskById(id);

        if(!existingTask) {
            return null;
        }

        return this.taskRepository.update(id, task);
    }

    async deleteTask(id: Task['id']): Promise<void> {
        const existingTask = await this.taskRepository.getTaskById(id);

        if(existingTask) {
            this.taskRepository.delete(id);
        }
    }
}