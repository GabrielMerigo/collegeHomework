require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./src/server')
const port = process.env.PORT || 5000

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(res => {
    app.listen(port)
  })
  .catch(err => {
    console.log(err)
  })
