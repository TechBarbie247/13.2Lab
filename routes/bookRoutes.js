
const express = require('express');
const mongoose = require('mongoose');
const Book = require("../models/Books");

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'ISBN must be unique' });
    }
    return res.status(400).json({ message: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const updated = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    return res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'ISBN must be unique' });
    }
    return res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    return res.json({ message: 'Book deleted', id: deleted._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;