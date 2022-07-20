const Store = require('../models/Store');

const getStores = async (req, res) => {
  const stores = await Store.find();

  try{
    res.status(200).json({ stores });
  }catch(err){
    return res.status(500).json({ err });
  }
}

const deleteStore = async (req, res) => {
  const id = req.params.id;
  
  try{
    await Store.deleteOne({ _id: id});
    res.status(200).json({ message: 'store has been deleted with success' });
  }catch (err){
    res.status(500).json({ message: err.message })
  }
}

const updateStore = async (req, res) => {
  const id = req.params.id;
  const { location, numberAddres, district, peoplePerDay, isRent } = req.body;
  const store = { location, numberAddres, district, peoplePerDay, isRent };
  const storeExist = await Store.findOne({ _id: id }) === null;

  if (storeExist){ 
    return res.status(422).json({ message: 'store not found' });
  }

  try{
    await Store.updateOne({ _id: id }, store);
    res.status(200).json({ message: 'store has been updated with success' });
  }catch(err){
    res.status(500).json({ message: err.message })
  }
}

const getStoreById = async (req, res) => {
  const id = req.params.id;
  try{
    const store = await Store.findOne({ _id: id });

    if(!store){
      return res.status(422).json({ message: 'store not found' });
    }

    res.status(200).json(store);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

const createStore = async (req, res) => {
  const { location, numberAddres, district, peoplePerDay, isRent } = req.body;
  
  if(!location || !numberAddres || !district || !peoplePerDay || isRent === undefined){
    return res.status(422).json({ error: 'The fields location, numberAddres, district, peoplePerDay and isRent are required.' });
  }

  const store = { location, numberAddres, district, peoplePerDay, isRent };

  try{
    await Store.create(store);
    res.status(201).json({ message: 'store has been created!' });
  }catch(err){
    res.status(500).json({ err })
  }
}

module.exports = {
  getStores,
  deleteStore,
  updateStore,
  getStoreById,
  createStore
}