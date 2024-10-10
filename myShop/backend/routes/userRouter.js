const express = require('express');

const authController = require('../controllers/authController');
const adminMiddleWare = require('../middewares/adminMiddleWare');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/signin').post(authController.signin);
router.route('/users').get(authController.getUsers)
router.route('/remove').post(adminMiddleWare.protectDashbord,authController.deleteUser)
router.route('/admin').post(adminMiddleWare.adminLogin);

module.exports = router;



