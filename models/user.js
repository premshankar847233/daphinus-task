const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please enter username'],
        maxLength:[30,'your name can not exceeds 30 character']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid Email Id']
    },
    password:{
        type:String,
        required:[true,'Please Enter Your Password'],
        minLength :[6,'Your Password should be minimum 6 character'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//encrypting password before saving user
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

//return jwt token

userSchema.methods.getJwtToken = function()
{
    return jwt.sign({id:this._id,role:this.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

//compare user password

userSchema.methods.comparePassword = async function(enteredPassword){

    return bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("User",userSchema);
