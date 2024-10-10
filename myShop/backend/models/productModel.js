const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name is required']
    },
    image:String,
    description:{
        type:String,
        required:[true, 'Product description is required']
    },
    price:{
        type:Number,
        required:[true, 'Product price is required']
    },
 
    category:{
        type:String,
        required:[true, 'Product category is required']
    }
    
})

module.exports = mongoose.model('Product', productSchema);









