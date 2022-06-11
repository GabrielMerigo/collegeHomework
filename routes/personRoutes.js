const router = require('express').Router();
const Person =  require('../models/Person');

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;
  
  if(!name || !salary || !approved){
    res.status(422).json({ error: 'The fields name, salary and approved are required.' });
    return
  }

  const person = { name, salary, approved };

  try{
    await Person.create(person);
    res.status(201).json({ message: 'Person has been created!' });
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

    if(!person){
      return res.status(422).json({ message: 'Person not found' });
    }

    res.status(200).json(person);
  }catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = { name, salary, approved };
  const doesPersonExist = await Person.findOne({ _id: id }) === null;

  if (doesPersonExist){ 
    return res.status(422).json({ message: 'Person not found' });
  }

  try{
    await Person.updateOne({ _id: id }, person);
    res.status(200).json({ message: 'Person has been updated with success' });
  }catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  
  try{
    await Person.deleteOne({ _id: id});
    res.status(200).json({ message: 'Person has been deleted with success' });
  }catch (err){
    res.status(500).json({ message: err.message })
  }
})

module.exports = router;