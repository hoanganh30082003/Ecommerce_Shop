const paymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    amount: Number,
    payment_method: String,
    payment_status: { type: String, enum: ['success', 'failed', 'pending'] },
    transaction_id: String,
    paid_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  