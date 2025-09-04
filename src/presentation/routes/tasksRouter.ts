import { Router } from 'express';
import { taskController } from '../../main/factories/taskFactory';

const router = Router();

router.get('/', (req, res) => taskController.getAll(req, res));
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
router.post('/', (req, res) => taskController.create(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

export { router as taskRouter};