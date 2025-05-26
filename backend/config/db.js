const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'resto_app',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  port: process.env.PGPORT || 5432,
});

module.exports = pool;

