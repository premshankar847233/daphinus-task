const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//register a user => api/register

exports.registerUser = catchAsyncError(async (req,res,next)=>{

    if(!req.body.role)
    {
        const {name,email,password} = req.body;

        const user = await User.create({
            name,
            email,
            password
        })

        res.status(200).json({
            status:true,
            message : "user saved successfully",
            user
        })
    }
    else
    {
        const {name,email,password,role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        })

        res.status(200).json({
            status:true,
            message : "user saved successfully",
            user
        })
    }
})

//api/loginuser
exports.loginuser = catchAsyncError(async (req,res,next)=>{

    const {email,password} = req.body;

    //check whether user have entered email and password or not

    if(!email || !password)
    {
        return next(new ErrorHandler('Please Enter Email and password',400))
    }

    //finding user in database
    const user = await User.findOne({email}).select('-createdAt -password')

    if(!user)
    {
        return next(new ErrorHandler('Invalid Login credentials',401))
    }

    //if user with respective email is found then check for password
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler('Invalid Login Credentials',401))
    }

    console.log("Login Successfully")
    sendToken(user,200,res);

})

exports.loginadmin = catchAsyncError(async (req,res,next)=>{

    const {email,password} = req.body;

    //check whether user have entered email and password or not

    if(!email || !password)
    {
        return next(new ErrorHandler('Please Enter Email and password',400))
    }

    //finding user in database
    const user = await User.findOne({email}).select('-createdAt -password')

    if(!user)
    {
        return next(new ErrorHandler('Invalid Login credentials',401))
    }

    //if user with respective email is found then check for password
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler('Invalid Login Credentials',401))
    }

    if(!user.role == 'Admin')
    {
        return next(new ErrorHandler('Invalid Login Credentials for Admin'))
    }
    sendToken(user,200,res);
})