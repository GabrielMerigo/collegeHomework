require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./src/routes/productsRoutes/productsRoutes');
const authRoutes = require('./src/routes/authRoutes/authRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hi, Express!'});
});

module.exports = app;