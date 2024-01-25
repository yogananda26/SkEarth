const { async_wrapper } = require("../middleware/async-wrapper");
const User = require('../model/User');
const {StatusCodes} = require("http-status-codes");
const {auth_error, bad_request} = require("../error/driver-error");


const signUp = async_wrapper(async(req, res, next)=>{ 
    const {name, email, password} = req.body;
    // console.log(name, email, password); 
    if(!name || !email || !password) { 
        throw new auth_error("provide your credential thing");
    }
    // this is for checking
    const isRegistered = await User.findOne({email : email});
    if(isRegistered){
        throw new auth_error("you've been registered");
    }
    const user = await User.create({...req.body})
    const token = user.create_JWT();
    res.status(StatusCodes.ACCEPTED).json({data : user, token : token});
})

const logIn = async_wrapper(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new auth_error("please input your credential data");
    }
    const user = await User.findOne({email : email});
    if(!user){
        throw new auth_error("there is no user with this email");
    }
    const isMatch = await user.check_password(password);
    if(!isMatch){ 
        throw new auth_error("your password is wrong");
    }
    const token = await user.create_JWT();
    res.status(StatusCodes.ACCEPTED).json({token : token});
})
const get_user = async_wrapper(async(req,res,next)=>{ 
    const user_info = req.user; 
    res.json(user_info); 
})

const get_all_user = async_wrapper(async(req, res)=>{  
    const result = await User.find({});
    res.status(200).json(result);
})
module.exports ={
    logIn, signUp, get_user, get_all_user
}
