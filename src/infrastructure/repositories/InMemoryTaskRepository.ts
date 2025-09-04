import { ITaskRepository } from '../../application/repositories/ITaskRepository';
import { Task } from '../../domain/TaskDomain';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async create(taskData: Omit<Task, 'id' | 'completed'>): Promise<Task> {
    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      ...taskData,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  async getTaskById(id: Task['id']): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async update(id: Task['id'], newTask: Task): Promise<Task | null> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if(taskIndex === -1) {
      return null;
    }

    const updatedTask = {...this.tasks[taskIndex], ...newTask};
    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  async delete(id: Task['id']): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === id);

    if(index !== -1) {
      this.tasks.splice(index,1);
    }
  }
}
