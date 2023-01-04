const Pool = require('pg').Pool;

const pool = new Pool ({
    user : 'postgres_sql',
    password: 'LCcOCmJQrgFIMQVNQG3RNzQTgtcg7kkb',
    host: 'https://travelandexplore-app-back-end.onrender.com',
    localhost: 5432,
    database: 'travel_explore-db'
});

module.exports = pool;
