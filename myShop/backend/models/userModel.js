const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name must be provided']
    },
    email:{
        type:String,
        required:[true, 'email must be provided'],
        unique:true,
        validator: [validator.isEmail,' Email is not valid']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:8,
        select:false
    },


    isAdmin:{
        type:Boolean,
        default:false,
    },

    role:{
        type:String,
        default:'user'
    },
    confirmPassword:{
        type:String,
        required:[true, 'Please Confirm Your Password'],
        validator:{
            validator: function(el){
                return el === this.password
            },
            message:'Passwords do not match'
        }
    }
})


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confrmPassword = undefined;
    next();
})

userSchema.methods.comparePassword = async function(currentPassword, userPassword){
    return await bcrypt.compare(currentPassword, userPassword)
}


module.exports = mongoose.model('User',userSchema)