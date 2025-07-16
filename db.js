const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('webapp.db');

// Create a sample table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )`);
});

module.exports = db;
