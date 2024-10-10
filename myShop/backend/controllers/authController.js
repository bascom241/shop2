const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
}
exports.register = async (req, res) => {

    
    try {


        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })

        const token = signToken(user._id);

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
     

        let freshUser = await User.findById(decoded.id);
         freshUser=freshUser._id

        res.status(200).json({ status: 'success', token, freshUser })
    } catch (err) {

        res.status(404).json({ status: 'error', message: 'Invalid Credentials' })
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({ message: 'User Not Found' });
    }
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(404).json({ message: 'Invalid Email or Pasword' })
        }
        const token = signToken(user._id);
 

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
     

        let freshUser = await User.findById(decoded.id);
         freshUser=freshUser._id
       

        res.status(200).json({ status: 'success', token,freshUser });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}




exports.getUsers =async  (req,res) => {
    try{
        const users = await User.find();
        if(!users){
            return res.status(404).json({message:'Users not found'})
        } 
  
        res.status(200).json({status:'success', data:users})
    } catch(err){
        res.status(500).json({message:'Error'})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;

        // Find the user by ID
        const user = await User.findById(userId);
        
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deletion if the user is an admin
        if (user.isAdmin) {
            return res.status(403).json({ message: 'Admin user cannot be deleted' });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);
        res.status(200).json({ status: 'success', message: 'User deleted' });
        
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        res.status(500).json({ message: 'Error deleting user' });
    }
};


exports.protect = async (req, res, next) => {
    let token;
    try {


        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return res.status(404).json({ message: 'You are not Login' })
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      

        let freshUser = await User.findById(decoded.id);
        req.user = freshUser
       
        next();
    } catch (err) {
        res.status(404).json({ message: err.message });
    }


}


// -------------------------------//
