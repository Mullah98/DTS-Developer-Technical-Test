const request = require("supertest");
const {app, server, pool} = require("../index.js");

//testing purposes only
afterAll(async () => {
    await pool.end();
    server.close();
})

describe('Task Manager API', () => {
    let taskId;

    it('should create a task', async () => {
        const response = await request(app)
        .post('/tasks')
        .send({
            title: 'Test task',
            description: 'Test description',
            status: 'Incomplete',
            due_date: '2025-04-23T10:00:00',
        });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test task');
        taskId = response.body.task_id
    });

    it('should retrieve a task by the task ID', async () => {
        const response = await request(app)
        .get(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.task_id).toBe(taskId)
    });

    it('should retrieve all tasks', async () => {
        const response = await request(app)
        .get('/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should successfully update a task', async () => {
        const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send({
            status: 'Complete'
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('Complete')
    });

    it('should successfully delete a task', async () => {
        const response = await request(app)
        .delete(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task has successfully been deleted');
    });

    it('should return a task object with the correct fields', async () => {
        const response = await request(app)
        .post('/tasks')
        .send({
            title: 'Test task',
            description: 'Test description',
            status: 'Incomplete',
            due_date: '2025-04-23T10:00:00'
        });

        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('due_date');
    });

    it('should not create a task without a title', async () => {
        const response = await request(app)
        .post('/tasks')
        .send({
            description: 'Test description',
            status: 'Incomplete',
            due_date: '2025-04-23T10:00:00'
        });

        expect(response.status).not.toBe(201);
    });

    it('should return a 400 for an invalid task ID (Bad request) ', async () => {
        const response = await request(app)
        .delete('/tasks/abcdefg');

        expect(response.status).toBe(400);
    });

    it('should return a 404 for a non-existing task ID', async () => {
        const response = await request(app)
        .delete('/tasks/999999');

        expect(response.status).toBe(404);
    });
});