// this is for verify if there is any token in header page
const jwt = require("jsonwebtoken"); 
const {auth_error} = require("../error/driver-error")
const {async_wrapper} = require("./async-wrapper");

const authentication = async_wrapper(async(req, res, next)=>{ 
    const header_token = req.headers.authorization; 
    console.log(req.headers.authorization);

    if(!header_token || !header_token.startsWith('Bearer ')){ 
        throw new auth_error("You dont have permission to access this page, please login first")
    }
    const token = header_token.split(' ')[1]; 
    try{ 
        const decode = jwt.verify(token, process.env.PRIVATE_CODE); 
        const {userID, name} = decode;
        req.user = {userID , name};
        console.log(decode);
        next()
    }catch(err){ 
        throw new auth_error("You dont have permission to access this page")
    }

})

module.exports = { 
    authentication 
}
