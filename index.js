require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/server');
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://gabriel:flashzika2003@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err)
  })