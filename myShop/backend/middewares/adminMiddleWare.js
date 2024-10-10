const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


const signToken = (user) =>{
   return jwt.sign({id:user._id,isAdmin: user.isAdmin }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}
exports.adminLogin = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(404).json({message:'Please Provide email or password'})
    }


    try{
            const user = await User.findOne({email}).select('+password');
            if(!user || !(await user.comparePassword(password,user.password))){
                return res.status(500).json({message:'Invalid Email or Password'})
            }

            // if(!user.isAdmin){
            //     return res.status(403).json({status:'error', message:'Access Denied! Admin Only'})
            // }

            const allowedAdmin = process.env.ADMIN_USERNAME;
            if (user.email === allowedAdmin){
                user.isAdmin = true;
                user.role = 'admin';
                await user.save();
            } else {
                user.isAdmin = false;
            }

         

            const token = signToken(user);
            res.status(200).json({status:'success', token})
       
    }
    catch(err){
        res.status(404).json({status:'Fail', message:err.message})
        console.log(err.message)
    }


}



exports.protectDashbord = async (req,res, next) =>{

    let token 
    try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(403).json({message:'You are not Logged In'})
    }
        const decoded = await promisify (jwt.verify) (token, process.env.JWT_SECRET);
        if(!decoded.isAdmin){
            return res.status(403).json({message:'Acess Denied! Admins Only'})
        }
        req.user = decoded
        next();

    } catch(err){
        res.status(404).json({message:err.message})
        console.log(err.message)
    }
}


// exports.protect = async (req, res, next) => {
//     let token;
//     try {


//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1]
//         }
//         if (!token) {
//             return res.status(404).json({ message: 'You are not Login' })
//         }

//         const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      

//         let freshUser = await User.findById(decoded.id);
//         req.user = freshUser
       
//         next();
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }


// }
