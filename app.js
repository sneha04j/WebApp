const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

// Example Redirect Route
app.get('/redirect', (req, res) => {
  res.redirect('https://www.example.com');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
