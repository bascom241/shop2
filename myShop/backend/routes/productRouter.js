const express = require('express');
const multer = require('multer');
const productConroller = require('../controllers/productController');
const cloudinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const adminMiddleWare = require('../middewares/adminMiddleWare')
// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename:(req,file,cb)=>{
//         cb(null, `${Date.now()} -- ${file.originalname}`)
//     }
// })


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        public_id: (req, file) => `${Date.now()}-${file.originalname}` // Use a unique identifier for the file
    }
});

const upload = multer({storage:storage});

const router = express.Router();
router.route('/products').get(productConroller.getProducts);
router.route('/add').post(adminMiddleWare.protectDashbord,upload.single("image"),productConroller.addProduct);
router.route('/product/:id').get(productConroller.getProduct)
router.route('/:id').delete(adminMiddleWare.protectDashbord,productConroller.removeProduct);
router.route('/products/:productId').patch(upload.single('image'),adminMiddleWare.protectDashbord,productConroller.editProduct)


// Category Page 
router.route('/Phones').get(productConroller.getPhones,productConroller.getProducts);
router.route('/Laptops').get(productConroller.getLaptops,productConroller.getProducts);
router.route('/Earpods').get(productConroller.getearPods, productConroller.getProducts)
router.route('/High').get(productConroller.getHighPrice, productConroller.getProducts);
router.route('/Low').get(productConroller.getLowPrice, productConroller.getProducts)

module.exports = router