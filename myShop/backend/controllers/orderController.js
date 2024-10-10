const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')
const axios = require('axios')
exports.verifyPayment = async (req,res) =>{
    const { reference, userId, cart, customerDetails, cartTotal, DeliveryFee } = req.body;
    try {
        // Verify transaction from Paystack

        if(!cart){
          return res.status(404).json({message:'Your Cart is empty '})
        }
        if (!customerDetails){
          return res.status(404).json({message:'Please provide necessary Information / cart'})
        }
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` // Use secret key from .env
          }
        });

        if (response) {
          // Payment was successful, store order in the database
          const newOrder = new Order({
            userId,
            items: cart,
            customerDetails,
            cartTotal,
            DeliveryFee,
            paymentStatus: 'successful',
            reference: reference
          });
          
          await newOrder.save();
          
          await Cart.findOneAndUpdate({ userId }, { items: [] });

    
          res.status(200).json({ message: 'Payment verified and order created', orderId: newOrder._id });
        } else {
          res.status(400).json({ message: 'Payment verification failed' });
          console.log('error')
        }

    }catch(err){
      res.status(500).json({ message: 'Error verifying payment', error: err.message });
      console.log(err.message)
    }
}


exports.getOrders = async (req,res) =>{
  try{
    const orders = await Order.find();
    res.status(200).json({status:'success', data:orders})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}