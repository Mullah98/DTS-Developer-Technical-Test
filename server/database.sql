CREATE DATABASE task_manager;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(25) NOT NULL,
    due_date TIMESTAMP NOT NULL
);