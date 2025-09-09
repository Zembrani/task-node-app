import { ITaskRepository } from '../../application/repositories/ITaskRepository';
import { ExternalTask, Task } from '../../domain/TaskDomain';
import { TaskFactory } from '../../domain/TaskFactory';
import { ExternalAPIRepository } from '../external/ExternalAPIRepository';

export class TaskAdapter implements ITaskRepository {
  constructor(
    private taskFactory: TaskFactory,
    private externalApi: ExternalAPIRepository
  ) {}

  async getAll(): Promise<Task[]> {
    const externalTasks = await this.externalApi.getAll();
    return externalTasks.map((task) => {
      return {
        id: task.orderNumber,
        title: task.name,
        description: task.subject,
        completed: task.status,
      };
    });
  }

  async create(taskData: Omit<Task, 'id' | 'completed'>): Promise<Task> {
    const newTask = this.taskFactory.create(taskData);

    const newExternalTask: ExternalTask = {
      name: newTask.title,
      subject: newTask.description,
      orderNumber: newTask.id,
      status: newTask.completed,
    };

    await this.externalApi.create(newExternalTask);

    return newTask;
  }

  async getTaskById(id: Task['id']): Promise<Task | undefined> {
    const orderNumber: ExternalTask['orderNumber'] = id;

    const externalTask = await this.externalApi.getTaskById(orderNumber);
    if(!externalTask) {
      return undefined;
    }

    const task: Task = {
      id: externalTask.orderNumber,
      title: externalTask.name,
      description: externalTask.subject,
      completed: externalTask.status
    }
    return task;
  }

  async update(id: Task['id'], task: Partial<Task>): Promise<Task | null> {
    const orderNumber: ExternalTask['orderNumber'] = id;
    const externalTaskUpdate: Partial<ExternalTask> = {};

    if (task.title !== undefined) externalTaskUpdate.name = task.title;
    if (task.description !== undefined) externalTaskUpdate.subject = task.description;
    if (task.completed !== undefined) externalTaskUpdate.status = task.completed;

    const updatedExternalTask = await this.externalApi.update(orderNumber, externalTaskUpdate);

    if (!updatedExternalTask) {
      return null;
    }
    const updatedTask: Task = {
      id: updatedExternalTask.orderNumber,
      title: updatedExternalTask.name,
      description: updatedExternalTask.subject,
      completed: updatedExternalTask.status,
    };

    return updatedTask;
  }

  async delete(id: Task['id']): Promise<void> {
    const orderNumber: ExternalTask['orderNumber'] = id;

    await this.externalApi.delete(orderNumber);
  }
}
