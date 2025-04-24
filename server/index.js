const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json())

//Routes

//Create a new task
app.post("/tasks", async(req, res) => {

    const { title, description, status, due_date } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" })
    }

    try {
        const newTask = await pool.query("INSERT INTO tasks (title, description, status, due_date) VALUES($1, $2, $3, $4) RETURNING *", 
        [title, description, status, due_date]
    );

    res.status(201);
    res.json(newTask.rows[0]);
} catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" })
    }
})


//Get all tasks
app.get("/tasks", async(req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM tasks");
        res.json(allTasks.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Get a task
app.get("/tasks/:id", async(req, res) => {
    const { id } = req.params;
    
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid task ID" })
    }

    try {
        const task = await pool.query("SELECT * FROM tasks WHERE task_id = $1",
        [id]);

        if (task.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json(task.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//Update a task
app.put("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description, status } = req.body;
        const updateTask = await pool.query("UPDATE tasks SET description = COALESCE($1, description), status = $2 WHERE task_id = $3 RETURNING *",
        [description, status, id]);

        if (updateTask.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json(updateTask.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//Delete a task
app.delete("/tasks/:id", async(req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid task ID" })
    }
    
    try {
        const deleteTask = await pool.query("DELETE FROM tasks WHERE task_id = $1",
        [id]);

        if (deleteTask.rowCount === 0) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json({message:"Task has successfully been deleted"});
    } catch (err) {
        console.log(err.message)
    }
})


//For local testing and development
const server = app.listen(5000, () => {
    console.log('server has started on port 5000');
});

module.exports = { app, server, pool }