const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.getAllProducts);
router.get('/detail/:id', productController.getProductDetail);
router.post('/create', productController.createProduct);
module.exports = router; 