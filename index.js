require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/person', personRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'oi Express!'});
});

mongoose.connect(`mongodb+srv://gabriel:${process.env.PASSWORDMONGODB}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })