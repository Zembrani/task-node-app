import { TaskFactory } from '../../domain/TaskFactory';
import { TaskService } from "../../application/services/TaskService";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { TaskController } from "../../presentation/controllers/TaskController";
import { TaskAdapter } from '../../infrastructure/adapters/TaskAdapter';
import { ExternalAPIRepository } from '../../infrastructure/external/ExternalAPIRepository';

const taskFactory = new TaskFactory();
const externalTask = new ExternalAPIRepository();
const externalTaskAdapter = new TaskAdapter(taskFactory, externalTask);
// const taskRepository = new InMemoryTaskRepository(taskFactory);
const taskService = new TaskService(externalTaskAdapter);
export const taskController = new TaskController(taskService);