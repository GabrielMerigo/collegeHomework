require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hi, Express!'});
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })