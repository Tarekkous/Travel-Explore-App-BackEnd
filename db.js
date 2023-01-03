const Pool = require('pg').Pool;

const pool = new Pool ({
    user : 'postgres',
    password: 'database',
    host: 'localhost',
    localhost: 5432,
    database: 'TRAVEL&EXPLORE-DB'
});

module.exports = pool;