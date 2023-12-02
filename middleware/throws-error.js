const {asycn_error} = require('../middleware/error-handlers'); 

const get_error = (err, req, res, next) =>{
    if(err instanceof asycn_error){ 
        return res.status(err.status).json({input: "null", msg : err.message});
    }
}
module.exports = get_error;