import Router from 'express';
import TodoController from './TodoController.js';

const router = new Router();

router.get('/todos', TodoController.getAll);
router.post('/todos', TodoController.create);
router.delete('/todos/:id', TodoController.delete);

export default router;
