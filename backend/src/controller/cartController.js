const Cart = require('../model/Cart');

// Lấy thông tin giỏ hàng theo user_id
const getCartByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await Cart.findOne({ user_id }).populate('items.product_id');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCart = async (req, res) => {
  try {
    const { user_id, items } = req.body;
    // Kiểm tra nếu user đã có cart thì trả về lỗi
    const existing = await Cart.findOne({ user_id });
    if (existing) return res.status(400).json({ message: 'User already has a cart' });
    const cart = new Cart({ user_id, items });
    await cart.save();
    res.status(201).json({ message: 'Cart created', data: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { user_id, product_id, variant, quantity } = req.body;
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      // Nếu chưa có cart thì tạo mới
      cart = new Cart({ user_id, items: [{ product_id, variant, quantity }] });
      await cart.save();
      return res.status(201).json({ message: 'Cart created and product added', data: cart });
    }
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const itemIndex = cart.items.findIndex(
      item => item.product_id.toString() === product_id && JSON.stringify(item.variant) === JSON.stringify(variant)
    );
    if (itemIndex > -1) {
      // Nếu đã có thì tăng số lượng
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Nếu chưa có thì thêm mới
      cart.items.push({ product_id, variant, quantity });
    }
    cart.updated_at = new Date();
    await cart.save();
    res.status(200).json({ message: 'Product added to cart', data: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCartByUserId,
  createCart,
  addProductToCart
}; 