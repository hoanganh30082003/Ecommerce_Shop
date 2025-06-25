const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['single', 'combo'], required: true },
    description: String,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: Number, // dùng cho 'single'
    fixed_combo_price: Number, // dùng cho 'combo'
    images: [String],
    tags: [String],
    variants: [
      {
        color: String,
        stock_quantity: Number
      }
    ],
    combo_items: [ // chỉ có nếu type === 'combo'
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
      }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Product', productSchema);
  