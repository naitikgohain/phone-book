const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'phonebook',
    port: 5432,
});