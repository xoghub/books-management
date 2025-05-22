// import Books from '../models/Books.js';
const Books = require('../models/Books');
const { Op } = require('sequelize');
// Tambah buku baru
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, year } = req.body;
    
    // Validasi
    if (!title || !author || !year) {
      return res.status(400).json({
        status: 'error',
        message: 'Title, author, and year are required'
      });
    }
    
    const newBook = await Books.create({
      title,
      author,
      year
    });
    
    res.status(201).json({
      status: 'success',
      data: newBook
    });
  } catch (error) {
    next(error);
  }
};

// Ambil semua buku dengan filter
exports.getAllBooks = async (req, res, next) => {
  try {
    const { title, author, year } = req.query;
    
    // Build filter
    const filter = {};
    
    if (title) {
      filter.title = { [Op.like]: `%${title}%` };
    }
    
    if (author) {
      filter.author = { [Op.like]: `%${author}%` };
    }
    
    if (year) {
      filter.year = year;
    }
    
    const books = await Books.findAll({
      where: filter
    });
    
    res.status(200).json({
      status: 'success',
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// Ambil detail buku berdasarkan ID
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Books.findByPk(id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Books with id ${id} not found`
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Update data buku
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
    
    const book = await Books.findByPk(id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Books with id ${id} not found`
      });
    }
    
    // Update fields
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;
    
    await book.save();
    
    res.status(200).json({
      status: 'success',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Hapus buku
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Books.findByPk(id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Books with id ${id} not found`
      });
    }
    
    await book.destroy();
    
    res.status(200).json({
      status: 'success',
      message: `Books with id ${id} successfully deleted`
    });
  } catch (error) {
    next(error);
  }
};