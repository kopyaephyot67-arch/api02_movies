// ─────────────────────────────────────────────────────────────
// db.js — Database Connection
// ─────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS:
//   Instead of connecting to the database in every route file,
//   we create ONE connection pool here and share it everywhere.
//   A "pool" reuses connections instead of opening a new one
//   for every request — much faster and more efficient.
//
// HOW IT WORKS:
//   mysql2/promise gives us async/await support (no callbacks).
//   We read credentials from .env so secrets are never in code.
//   DB_SSL=true is required by TiDB Cloud (encrypted connection).
// ─────────────────────────────────────────────────────────────

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 4000,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
  waitForConnections: true,  // queue requests when pool is full
  connectionLimit:    10,    // max 10 simultaneous connections
  queueLimit:         0,     // unlimited queue
});

module.exports = pool;