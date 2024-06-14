import { Router } from 'express';
import { TaskManager } from '../taskManager';

const router = Router();
const taskManager = new TaskManager();

router.post('/', (req, res) => {
  const { description, time, recurring } = req.body;
  const task = taskManager.addTask(description, time, recurring);
  res.status(201).send(task);
});

router.get('/', (req, res) => {
  res.send(taskManager.getTasks());
});

router.get('/logs', (req, res) => {
  res.send(taskManager.getLogs());
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { description, time, recurring } = req.body;
  const updatedTask = taskManager.updateTask(id, description, time, recurring);
  res.send(updatedTask);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  taskManager.deleteTask(id);
  res.status(204).send();
});

export default router;
