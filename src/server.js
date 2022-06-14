require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', productRoutes);
app.use('/', storeRoutes);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Hi, Express!'});
});

module.exports = app;