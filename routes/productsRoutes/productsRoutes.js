const router = require('express').Router();
const Product = require('../../models/Product');
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({ message: 'Access denied!' });
  }

  try{
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  }catch(err){
    res.status(400).json({ message: 'Invalid Token!' })
  }
};

router.post('/product', checkToken, async (req, res) => {
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
})

router.get('/product/:id', checkToken, async (req, res) => {
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
})

router.patch('/product/:id', checkToken, async (req, res) => {
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
})

router.delete('/product/:id', checkToken, async (req, res) => {
  const id = req.params.id;
  
  try{
    await Product.deleteOne({ _id: id});
    res.status(200).json({ message: 'product has been deleted with success' });
  }catch (err){
    res.status(500).json({ message: err.message })
  }
});

router.get('/products', checkToken, async (req, res) => {
  try{
    const products = await Product.find();
    res.status(200).json(products);
  }catch(err){
    res.status(500).json({ err })
  }
})

module.exports = router;