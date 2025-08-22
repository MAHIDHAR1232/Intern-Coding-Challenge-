const express = require('express');
const router = express.Router();

// Placeholder: Get all stores
router.get('/', (req, res) => {
  res.json({ message: 'Get all stores' });
});

// Placeholder: Get a single store by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get store with ID ${req.params.id}` });
});

// Placeholder: Create a new store
router.post('/', (req, res) => {
  res.json({ message: 'Create a new store' });
});

// Placeholder: Update a store by ID
router.put('/:id', (req, res) => {
  res.json({ message: `Update store with ID ${req.params.id}` });
});

// Placeholder: Delete a store by ID
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete store with ID ${req.params.id}` });
});

module.exports = router; 