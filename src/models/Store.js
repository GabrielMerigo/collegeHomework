const mongoose = require('mongoose');

const Store = mongoose.model('store', {
  location: String,
  numberAddres: Number,
  district: String,
  peoplePerDay: Number,
  isRent: Boolean
});

module.exports = Store;