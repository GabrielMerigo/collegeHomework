const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find();

  try{
    res.status(200).json({ products });
  }catch(err){
    return res.status(500).json({ err });
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  
  try{
    await Product.deleteOne({ _id: id});
    res.status(200).json({ message: 'product has been deleted with success' });
  }catch (err){
    res.status(500).json({ message: err.message })
  }
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, hasInStorage } = req.body;
  const product = { name, price, hasInStorage };
  const productExist = await Product.findOne({ _id: id }) === null;

  if (productExist){ 
    return res.status(422).json({ message: 'product not found' });
  }

  try{
    await Product.updateOne({ _id: id }, product);
    res.status(200).json({ message: 'product has been updated with success' });
  }catch(err){
    res.status(500).json({ message: err.message })
  }
}

const getProductById = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOne({ _id: id });

    if(!product){
      return res.status(422).json({ message: 'product not found' });
    }

    res.status(200).json(product);
  }catch(err){
    res.status(500).json({ message: err.message })
  }
}

const createProduct = async (req, res) => {
  const { name, price, hasInStorage } = req.body;
  
  if(!name || !price || !hasInStorage){
    res.status(422).json({ error: 'The fields name, price and hasInStorage are required.' });
    return
  }

  const product = { name, price, hasInStorage };

  try{
    await Product.create(product);
    res.status(201).json({ message: 'product has been created!' });
  }catch(err){
    res.status(500).json({ err })
  }
}

module.exports = {
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  createProduct
}