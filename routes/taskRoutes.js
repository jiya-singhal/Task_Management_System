const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateJWT = require('../middlewares/authMiddleware');
const rbacMiddleware = require('../middlewares/rbacMiddleware');

// Route to create a new task
router.post('/', authenticateJWT, rbacMiddleware(['Admin', 'Owner']), taskController.createTask);

// Route to get all tasks with optional filters
router.get('/', authenticateJWT, taskController.getTasks);

// Route to update a specific task by ID
router.put('/:id', authenticateJWT, rbacMiddleware(['Admin', 'Owner']), taskController.updateTask);

// Route to mark a task as complete with dependency check
router.patch('/:id/complete', authenticateJWT, rbacMiddleware(['Admin', 'Owner']), taskController.markTaskComplete);

// Route to delete a specific task by ID
router.delete('/:id', authenticateJWT, rbacMiddleware(['Admin', 'Owner']), taskController.deleteTask);

// Route to list tasks with filters and sorting options
router.get('/incomplete', authenticateJWT, taskController.listTasks);

// Route to set a recurring interval for a task
router.patch('/:id/recurring', authenticateJWT, rbacMiddleware(['Admin', 'Owner']), taskController.setRecurringTask);

// Route to fetch high-priority tasks due within the next three days
router.get('/upcoming/high-priority', authenticateJWT, taskController.fetchUpcomingHighPriorityTasks);

module.exports = router;
