const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/addToCart').post(authController.protect,cartController.addToCart);
router.route('/getCarts/:userId').get(authController.protect,cartController.fetchCartItems);
router.route('/delete').delete(authController.protect,cartController.deleteFromCart);
router.route('/update').patch(authController.protect,cartController.updateCartItemQuantity)


module.exports = router;