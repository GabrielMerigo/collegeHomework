const mongoose = require('mongoose');

const Product = mongoose.model('product', {
  name: String,
  price: Number,
  hasInStorage: Boolean,
});

module.exports = Product;