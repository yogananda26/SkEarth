const { async_wrapper } = require("../middleware/async-wrapper");
const User = require('../model/User');
const {StatusCodes} = require("http-status-codes");
const {auth_error} = require("../error/driver-error");


const signUp = async_wrapper(async(req, res, next)=>{ 
    const {name, email, password} = req.body;
    // console.log(name, email, password); 
    if(!name || !email || !password) { 
        throw new auth_error("provide your credential thing");
    }
    const user = await User.create({...req.body})
    const token = user.create_JWT();
    res.status(StatusCodes.ACCEPTED).json({data : user, token : token});
})

const logIn = async_wrapper(async(req, res, next)=>{
    const {name, email, password} = req.body;
    if(!name || !password){
        throw new auth_error("please input your credential data");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new auth_error("there is no user with this email");
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){ 
        throw new auth_error("your password is wrong");
    }
    const token = await user.create_JWT();
    res.status(StatusCodes.ACCEPTED).json({data : token});
})

module.exports ={
    logIn, signUp
}
