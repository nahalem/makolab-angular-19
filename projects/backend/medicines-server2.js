const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory medicines data
let medicines = require('./medicines.json').medicines; // Plik JSON z Twoimi danymi

// 🟢 GET all medicines
app.get('/medicines', (req, res) => {
  res.json(medicines);
});

// 🔵 GET medicine by ID
app.get('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicine = medicines.find(m => m.id === id);
  if (!medicine) return res.status(404).json({ message: 'Not found' });
  res.json(medicine);
});

// 🟡 CREATE new medicine
app.post('/medicines', (req, res) => {
  const newMed = {
    ...req.body,
    id: medicines.length ? Math.max(...medicines.map(m => m.id)) + 1 : 1
  };
  medicines.push(newMed);
  res.status(201).json(newMed);
});

// 🟠 UPDATE existing medicine
app.put('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  medicines[index] = { ...req.body, id };
  res.json(medicines[index]);
});

// 🔴 DELETE medicine
app.delete('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  const deleted = medicines.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Medicine API running at http://localhost:${PORT}`);
});
