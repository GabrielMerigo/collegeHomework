const router = require('express').Router();
const Person =  require('../models/Person');

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;
  
  if(!name || !salary || !approved){
    res.status(422).json({ error: 'Os campos name, salary e approved são obrigatórios.' });
    return
  }

  const person = { name, salary, approved };

  try{
    await Person.create(person);
    res.status(201).json({ message: 'Person was created!' });
  }catch(err){
    res.status(500).json({ err })
  }
})

router.get('/', async (req, res) => {
  try{
    const people = await Person.find();
    res.status(200).json(people);
  }catch(err){
    res.status(500).json({ err })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try{
    const person = await Person.findOne({ _id: id });
    res.status(200).json(person);
  }catch(err){
    res.status(500).json({ messagem: err.message })
  }
})

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  
})

module.exports = router;