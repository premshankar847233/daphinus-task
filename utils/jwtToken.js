//create and send token and save this token in cookies

const sendToken = (user,statusCode,res) =>{

    //create jwt token
    const token = user.getJwtToken();

    //options for cookie
    const options = {

        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly : true
    }

    res.status(statusCode).cookie('token',token,options).json({

        status:true,
        message:'Login succesfully and user saved in cookies',
        token
    })
}

module.exports = sendToken;