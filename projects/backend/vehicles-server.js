const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3666;
const DATA_FILE = './vehicles.json';
app.use(cors());
app.use(bodyParser.json());
// Helper to read and write JSON file
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
// GET all users
app.get('/api/vehicles', (req, res) => {
  const users = readData();
  res.json(users);
});
// GET user by ID
app.get('/api/vehicles/:id', (req, res) => {
  const users = readData();
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send('Vehicles not found');
});
// POST create new user
app.post('/api/vehicles', (req, res) => {
  const users = readData();
  const newUser = req.body;
  newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
});
// PUT update user
app.put('/api/vehicles/:id', (req, res) => {
  const users = readData();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeData(users);
    res.json(users[index]);
  } else {
    res.status(404).send('Vehicles not found');
  }
});
// DELETE user
app.delete('/api/vehicles/:id', (req, res) => {
  let users = readData();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (newUsers.length !== users.length) {
    writeData(newUsers);
    res.sendStatus(204);
  } else {
    res.status(404).send('vehicles not found');
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
