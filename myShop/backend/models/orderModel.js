const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to a Product model
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          name:{
            type: String,
            required: true
          }
        }
      ],
    customerDetails: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal: { type: String, required: false},
        country: { type: String, required: true },
        phone: { type: String, required: true },
      },
    cartTotal:{
        type:Number,
        required:true
    },
    DeliveryFee:{
        type:Number,
        required:true 
    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending'
    },
    reference:String,
    createdAt: {
        type: Date,
        default: Date.now
      }
})


module.exports = mongoose.model('Order', orderSchema)