const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/taksMiddlewares');

const router = express.Router();

router.get('/tasks', tasksController.getAll); // get all tasks
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask); // create a new task
router.delete('/tasks/:id', tasksController.deleteTask); // delete a task
router.put('/tasks/:id',
tasksMiddleware.validateFieldTitle,
tasksMiddleware.validateFieldStatus,
tasksController.updateTask); // update a task

module.exports = router;