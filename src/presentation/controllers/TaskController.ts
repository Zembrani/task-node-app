import { Request, Response } from 'express';
import { ITaskService } from '../../application/services/ITaskService';
import { StatusCode } from '../utils/res-status';
import { Task } from '../../domain/TaskDomain';

export class TaskController {
  constructor(private taskService: ITaskService) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const task: Task[] = await this.taskService.getAll();
    return res.status(StatusCode.OK).json(task);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res
          .status(StatusCode.BAD_REQUEST)
          .json({ error: 'Title is a required field.' });
      }

      const task: Task = await this.taskService.createTask({
        title,
        description,
      });

      return res.status(StatusCode.CREATED).json(task);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCode.INTERNAL_ERROR)
          .json({ error: error.message });
      }
      return res
        .status(StatusCode.INTERNAL_ERROR)
        .json({ error: 'An unexpected error occurred.' });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(StatusCode.BAD_REQUEST)
          .json({ error: 'An ID parameter is a required.' });
      }

      const task: Task | null = await this.taskService.getTaskById(id);

      if (!task) {
        return res
          .status(StatusCode.NOT_FOUND)
          .json({ message: 'Task not found.' });
      }
      return res.status(StatusCode.OK).json(task);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCode.INTERNAL_ERROR)
          .json({ error: error.message });
      }
      return res
        .status(StatusCode.INTERNAL_ERROR)
        .json({ error: 'An unexpected error occurred.' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    const { title, description, completed } = req.body;
    const { id } = req.params;

    if (!id) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Missing request param Id.' });
    }
    if (
      typeof title === 'undefined' &&
      typeof description === 'undefined' &&
      typeof completed === 'undefined'
    ) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({
          error: 'Request body must contain at least one field to update.',
        });
    }

    const task: Partial<Task> = { title, description, completed };
    const taskReturn: Task | null = await this.taskService.updateTask(id, task);

    if (!taskReturn) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ error: 'Task not found.' });
    }

    return res.status(StatusCode.OK).json(taskReturn);
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCode.BAD_REQUEST).json();
    }

    await this.taskService.deleteTask(id);

    return res.status(StatusCode.NO_CONTENT).send();
  }
}
