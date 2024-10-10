const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
      
        if (!userId || !productId || quantity <= 0) {
            return res.status(404).json({status:false, message:'Invalid data Provided'})
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({status:false, message:'Product not Found'})
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]})
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        console.log(findCurrentProductIndex)
        if (findCurrentProductIndex === -1){
            cart.items.push({productId,quantity})
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save();
        res.status(200).json({success:true,data:cart})
    }
    catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 'Fail', message: err.message })
    }
}
exports.deleteFromCart = async (req, res) => {
    try {
        const {userId , productId} = req.body;
        if(!userId || !productId){
            return res.status(404).json({status: 'Fail', message:'Invalid Data Provided'})
        }
        const cart = await Cart.findOne({userId});
        console.log(cart)
        if(!cart){
            return res.status(404).json({status: 'Fail', message:'Cart Not Found'})
        }

        const findPorductIndex = cart.items.findIndex(product => product.productId.toString() === productId);
        if (findPorductIndex === -1) {
            return res.status(404).json({ status: false, message: 'Product not found in cart' });
        }
        console.log(findPorductIndex)
        cart.items.splice(findPorductIndex, 1);
        await cart.save();

        
        res.status(200).json({status:'sucess', data:cart})
        console.log('success')
    } catch (err) {
        console.log(err)
        res.status(404).json({ status: 'Fail', message: err })
    }
}

exports.fetchCartItems = async (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId){
            return res.status(404).json({ status: 'Fail', message:'userId is mandatory'})
        }
        const cart = await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:"image name description price category quantity"
        })
        console.log(cart)
        if(!cart){
            return res.status(404).json({ status: 'Fail', message:'Cart not found'})
        }

        const validItems = cart.items.filter(productItem=> productItem.productId)
        if(validItems.length < cart.items.length){
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = validItems.map(Item=>({
            productId:Item.productId._id,
            image:Item.productId.image,
            name:Item.productId.name,
            description:Item.productId.description,
            price:Item.productId.price,
            quantity:Item.quantity
        }))
        res.status(200).json({status: 'OK', data:{
            ...cart._doc,
            items:populateCartItems
        }})
        console.log('me')
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 'Fail', message: err.message })
    }
}

exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate the input
        if (!userId || !productId || quantity === undefined) {
            return res.status(404).json({ message: 'Invalid Data Provided' });
        }

        // Find the cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found' });
        }

        // Find the product in the cart
        const findProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findProductIndex === -1) {
            return res.status(404).json({ message: 'Product Not Found in the Cart' });
        }

        // Update the quantity or remove the product if quantity is <= 0
        if (quantity <= 0) {
            cart.items.splice(findProductIndex, 1);  // Remove product if quantity is zero or less
        } else {
            cart.items[findProductIndex].quantity = quantity;  // Update the quantity
        }

        // Filter out invalid items (optional but useful if products are deleted)
        const validItems = cart.items.filter(productItem => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
        }

        // Save the updated cart
        await cart.save();

        // Re-populate the cart items with product details
        await cart.populate({
            path: 'items.productId',
            select: 'image name description price category '
        }).execPopulate();

        // Prepare the populated cart data for the response
        const populatedCartItems = cart.items.map(Item => ({
            productId: Item.productId._id,
            image: Item.productId.image,
            name: Item.productId.name,
            description: Item.productId.description,
            price: Item.productId.price,
            quantity: Item.quantity
        }));

        // Respond with the updated cart data
        res.status(200).json({
            status: 'OK',
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        });

    } catch (err) {
        // Handle errors
        res.status(404).json({ status: 'Fail', message: err.message });
        console.log(err.message);
    }
};


