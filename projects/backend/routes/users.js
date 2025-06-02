const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/users.json');

// Helper: read JSON
function readUsers() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Helper: write JSON
function writeUsers(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET all users
router.get('/', (req, res) => {
  res.json(readUsers());
});

// GET single user
router.get('/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

// POST new user
router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
  let users = readUsers();
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  writeUsers(users);
  res.json(users[idx]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  let users = readUsers();
  const filtered = users.filter(u => u.id !== parseInt(req.params.id));
  if (filtered.length === users.length)
    return res.status(404).json({ message: 'User not found' });
  writeUsers(filtered);
  res.json({ message: 'User deleted' });
});

module.exports = router;
