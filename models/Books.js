const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema(
{
title: {
type: String,
required: [true, 'Title is required'],
trim: true,
},
author: {
type: String,
required: [true, 'Author is required'],
trim: true,
},
isbn: {
type: String,
unique: true,
sparse: true,
trim: true,
},
publishedDate: {
type: Date,
},
inStock: {
type: Boolean,
default: true,
},
},
{ timestamps: true }
);


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;