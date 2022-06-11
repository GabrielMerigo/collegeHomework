require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Person =  require('./models/Person');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/person', async (req, res) => {

  const { name, salary, approved } = req.body;
  console.log()
  
  if(!name || !salary || !approved){
    res.status(422).json({ error: 'Os campos name, salary e approved são obrigatórios.' })
  }

  const person = { name, salary, approved };

  try{
    await Person.create(person);
    res.status(201).json({ message: 'Pessoa inserida com sucesso' });
  }catch(err){
    res.status(500).json({ err })
  }

})

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