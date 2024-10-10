const Product = require('../models/productModel');
const fs = require('fs');









exports.getPhones = async(req,res,next)=>{
    req.query.category='Phone';
    req.query.sort='-price';
    next();
}

exports.getLaptops = async(req,res,next)=>{
    req.query.category='Laptop';
    req.query.sort='-price';
    next();
}
exports.getearPods = async(req,res,next)=>{
    req.query.category='EarPod';
    req.query.sort='-price';
    next();
}

exports.getHighPrice = async(req,res,next)=>{
    req.query.sort='-price';
    next()
}

exports.getLowPrice =async(req,res,next) =>{
    req.query.sort='price';
    next();
}


exports.getProducts = async (req, res) => {
    try {

        let queryObj = {...req.query};
        const excludedFiles = ['sort', 'fields'];
        excludedFiles.forEach(el => delete queryObj[el]);

        

        // 2 Advanced Filtering

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        let query =  Product.find(JSON.parse(queryStr));
        // 2 Sort 
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        }


       
        const products = await query;
        if (products.length < 1) {

            return res.status(404).json({ status: 'Fail', message: 'Product not found' })
        }
        res.status(200).json({ status: 'success', products })
    } catch (err) {
        res.status(404).json({ message: 'Error getting products' });
        console.log(err.message)
    }
}

exports.addProduct = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).json({ message: 'No file Uploded' })
        }
        const products = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.path
        })

        res.status(200).json({ message: 'Added to Invetory', products })
    } catch (err) {
        res.status(404).json({ message: 'Fail to upload product' });
        console.log(err.message);
    }
}

exports.getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json({message:'success', product})

    } catch (err) {
        res.status(404).json({ message: 'Cannot find Product' })
    }
}


// exports.editProduct = async (req,res) =>{
//     const {productId} = req.params;
//     if (!productId){
//         return res.status(400).json({message:'Error'})
//     }

//     const updatedProduct = {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
       
//     }

//     if (req.file) {
//         updatedProduct.image = req.file.path; // Add the image filename to the updateData object
//     }
    
  
//     try{
        
          

//             const product = await Product.findByIdAndUpdate(postId , updatedProduct)
            
//             res.status(200).json({status:'success', product})
     
        
//     } catch(err){
//         res.status(404).json({status:'Fail', message:err.message})
//     }
// }


exports.editProduct = async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ message: 'Error' });
    }

    const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    };

    if (req.file) {
        updatedProduct.image = req.file.path; // Add the image URL to the updateData object
    }

    try {
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        res.status(200).json({ status: 'success', data:{
            product
        } });
    } catch (err) {
        res.status(404).json({ status: 'Fail', message: err.message });
    }
};

exports.removeProduct = async (req,res) =>{
    const {id} = req.params;

    try{
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product not found"})
        // fs.unlink(`uploads/${product.image}`, err=>{
        //     if(err) {
        //         console.log('Error deleting file')
        //     } else {
        //         console.log('Successfully deleted file')
        //     }
        // })

        await Product.findByIdAndDelete(id);
        res.status(200).json({})

    }catch(err){
        res.status(404).json({message:'Error deleting product'})
    }

}