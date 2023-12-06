// this is for verify if there is any token in header page
const jwt = require("jsonwebtoken"); 
const {auth_error} = require("../error/driver-error")
const {async_wrapper} = require("./async-wrapper");

const auth = async_wrapper(async(req, res, next)=>{ 
    const header_token = req.headers.authorization; 
    console.log(req.headers.authorization);
    // this is for ekstracting
    if(!header_token || !header_token.startsWith('Bearer ')){ 
        throw new auth_error("You dont have permissino to access this page")
    }
    const token = header_token.split(' ')[1]; 
    console.log(token, "thig");
    try{ 
        const decode = jwt.verify(token, process.env.PRIVATE_CODE); 
        const {name, id} = decode;
        req.user = {name, id};
        console.log(decode);
        // this is suppose to use next(); 
        res.status(200).json({decode});
    }catch(err){ 
        throw new auth_error("You dont have permission to access this page")
    }
})

module.exports = { 
    auth
}