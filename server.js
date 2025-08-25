require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connection');
const bookRouter = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'Digital Bookshelf API running' });
});


app.use('/api/books', bookRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server listening on http://localhost:${PORT}`);
  });
});