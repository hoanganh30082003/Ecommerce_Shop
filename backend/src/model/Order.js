const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        product_name: String,
        variant: { color: String },
        quantity: Number,
        price: Number
      }
    ],
    total_price: Number,
    shipping_address: {
      street: String,
      city: String,
      district: String,
      ward: String
    },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
    payment_method: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  