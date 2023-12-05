const {custom_api_error} = require('../error/driver-error'); 

const get_error = (err, req, res, next) =>{
    if(err instanceof custom_api_error){ 
        res.status(err.status_code).json({input: "null", msg : err.message});
    }
}
module.exports = {get_error};