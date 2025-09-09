/**
 * ExternalAPIRepository
 *
 * This class serves as a mock implementation of an external API repository.
 * Its main objective is to simulate interactions with an external API for tasks,
 * allowing you to implement and test the Adapter Design Pattern in your application.
 *
 * Replace the mock logic with real API calls when integrating with a real backend.
 */

import { ExternalTask } from '../../domain/TaskDomain';

export class ExternalAPIRepository {
  private mockTasks: ExternalTask[] = [];

  async getAll(): Promise<ExternalTask[]> {
    return this.mockTasks;
  }

  async create(taskData: ExternalTask): Promise<ExternalTask> {
    this.mockTasks.push(taskData);
    return taskData;
  }

  async getTaskById(orderNumber: ExternalTask['orderNumber']): Promise<ExternalTask | undefined> {
    return this.mockTasks.find(task => task.orderNumber === orderNumber);
  }

  async update(orderNumber: ExternalTask['orderNumber'], newTask: Partial<ExternalTask>): Promise<ExternalTask | null> {
    const index = this.mockTasks.findIndex(task => task.orderNumber === orderNumber);
    const updatedTask = this.mockTasks[index];

    if (!updatedTask) return null;
    this.mockTasks[index] = { ...updatedTask, ...newTask };
    return this.mockTasks[index];
  }

  async delete(orderNumber: ExternalTask['orderNumber']): Promise<void> {
    const index = this.mockTasks.findIndex(task => task.orderNumber === orderNumber);
    if (index !== -1) {
      this.mockTasks.splice(index, 1);
    }
  }
}