import { TaskService } from "../../application/services/TaskService";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { TaskController } from "../../presentation/controllers/TaskController";

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);