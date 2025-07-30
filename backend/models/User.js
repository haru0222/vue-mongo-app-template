const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mail: String,
  tel: String
});

module.exports = mongoose.model('User', userSchema);
