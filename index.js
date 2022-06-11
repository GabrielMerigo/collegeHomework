require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/person', personRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hi Express!'});
});

app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if(!name || !email || !password || !confirmPassword){
    return res.status(422).json({ message: 'The name, email, password and confirmPassword are required' });
  }

})

mongoose.connect(`mongodb+srv://gabriel:${process.env.PASSWORDMONGODB}@apicluster.knjgws6.mongodb.net/?retryWrites=true&w=majority`)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })