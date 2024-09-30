const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const SECRET_KEY = 'your_secret_key'; // Use a strong secret key in production

app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists!' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'Registration successful!' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful!', token });
  } else {
    return res.status(401).json({ message: 'Invalid username or password!' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
