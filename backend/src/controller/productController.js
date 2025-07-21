const Product = require('../model/Product');

// Lấy toàn bộ sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết sản phẩm
const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductDetail,
  createProduct
}; 