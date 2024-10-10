const express = require('express');

const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController');


const router = express.Router();

router.route('/verify-payment').post(authController.protect,orderController.verifyPayment);
router.route('/orders').get(orderController.getOrders)

module.exports=router