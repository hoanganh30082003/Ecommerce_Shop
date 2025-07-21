const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.get('/:user_id', cartController.getCartByUserId);
router.post('/', cartController.createCart);
router.post('/add', cartController.addProductToCart);

module.exports = router; 