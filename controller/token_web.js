// this is for testing the web token
const {async_wrapper} = require("../middleware/async-wrapper");
const {auth_error} = require("../error/auth-error");
const jwt = require("jsonwebtoken"); 

const thing = async_wrapper(async(req, res, next) =>{
    console.log(req.body);
    const {name, id} = req.body
    if(!name || !id){ 
        next(new auth_error("please input your name and id"));
    }
    const token = jwt.sign({
        name: name, 
        id : id
    }, process.env.PRIVATE_CODE, { 
        expiresIn : "2d"
    })
    res.status(200).json({msg:"successfull", token})
})

module.exports = {thing}



