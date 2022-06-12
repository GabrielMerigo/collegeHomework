require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./server');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })