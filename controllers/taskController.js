const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo, team, dependencies } = req.body;

        // Check if any required fields are missing
        if (!title || !description || !priority || !assignedTo || !team || !dueDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newTask = new Task({ title, description, priority, dueDate, assignedTo, team, dependencies });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Get all tasks with optional filters
exports.getTasks = async (req, res) => {
    try {
        const { status, priority, assignedTo, dueDate, team } = req.query;
        const filter = {};

        // Apply filters based on query parameters
        if (status) {
            if (status === 'complete') {
                filter.completed = true;
            } else if (status === 'incomplete') {
                filter.completed = false;
            } else {
                return res.status(400).json({ message: 'Invalid status parameter. Use "complete" or "incomplete".' });
            }
        }
        if (priority) filter.priority = priority;
        if (assignedTo) filter.assignedTo = assignedTo;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };
        if (team) filter.team = team;

        // Fetch tasks based on the filters
        const tasks = await Task.find(filter).populate('assignedTo').populate('team');
        
        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found matching the criteria' });
        }
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, assignedTo, team, dependencies } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, priority, dueDate, assignedTo, team, dependencies },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};

// Mark task as complete with dependency check
exports.markTaskComplete = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task by ID and populate its dependencies
        const task = await Task.findById(id).populate('dependencies');
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check for incomplete dependencies if they exist
        const incompleteDependencies = task.dependencies.filter(dep => !dep.completed);
        if (incompleteDependencies.length > 0) {
            return res.status(400).json({ message: 'Cannot complete task with incomplete dependencies' });
        }

        // Mark task as complete if no incomplete dependencies
        task.completed = true;
        await task.save();

        res.status(200).json({ message: 'Task marked as complete', task });
    } catch (error) {
        res.status(500).json({ message: 'Error marking task as complete', error });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

        // If the task had dependencies, optionally handle deletion logic for them here.

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

// List incomplete tasks with filters and sorting
exports.listTasks = async (req, res) => {
    try {
        const { priority, dueDate, sortBy, order } = req.query;
        const filter = { completed: false };

        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

        const tasks = await Task.find(filter)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .populate('assignedTo', 'name')
            .populate('team', 'name');

        if (!tasks.length) {
            return res.status(404).json({ message: 'No incomplete tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Set recurring task interval and regenerate if needed
exports.setRecurringTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { recurringInterval } = req.body;

        if (!recurringInterval) {
            return res.status(400).json({ message: 'Recurring interval is required' });
        }

        const task = await Task.findByIdAndUpdate(
            id,
            { recurringInterval },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Optionally generate the next recurring task if needed here

        res.status(200).json({ message: 'Recurring interval set', task });
    } catch (error) {
        res.status(400).json({ message: 'Error setting recurring interval', error });
    }
};

// Fetch tasks due soon with high priority
exports.fetchUpcomingHighPriorityTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            priority: 'high',
            dueDate: { $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }, // Within 3 days
            completed: false
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No high-priority tasks due within the next 3 days' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming high-priority tasks', error });
    }
};
