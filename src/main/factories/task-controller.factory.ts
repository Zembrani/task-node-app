import { TaskFactory } from '../../domain/TaskFactory';
import { TaskService } from "../../application/services/TaskService";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { TaskController } from "../../presentation/controllers/TaskController";

const taskFactory = new TaskFactory();
const taskRepository = new InMemoryTaskRepository(taskFactory);
const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);