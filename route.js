const express = require('express');
const router = express.Router();
const db = require('../db');

// Create user
router.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, email });
  });
});

// Get all users
router.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Example redirect route
router.get('/go-google', (req, res) => {
  res.redirect('https://www.google.com');
});

module.exports = router;
