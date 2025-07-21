const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    slug: String
  });
  
  module.exports = mongoose.model('Category', categorySchema);
  