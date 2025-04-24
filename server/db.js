const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Ibrahim_1603",
    host: "localhost",
    port: 5432,
    database: "task_manager"
});

module.exports = pool;