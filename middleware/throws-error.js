const {custom_api_error} = require('../error/driver-error'); 
const {StatusCodes} = require("http-status-codes")
const get_error = (err, req, res, next) =>{
    if(err instanceof custom_api_error){ 
        res.status(err.status_code).json({input: "null", msg : err.message});
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : err}); 
}
module.exports = {get_error};