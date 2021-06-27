const express = require('express');
const connectDB = require('./config/database');
const produtos = require('./data/products');
const productRouter = require('./routes/product');
const errorHandler = require('./middleware/errorHandler');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

connectDB();

const app = express();

app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/produtos', productRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
