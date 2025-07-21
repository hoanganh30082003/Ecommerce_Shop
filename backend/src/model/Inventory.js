const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variant: { color: String },
    stock_quantity: Number,
    last_updated: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Inventory', inventorySchema);
  