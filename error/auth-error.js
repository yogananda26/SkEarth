
const { StatusCodes } = require('http-status-codes');
const {custom_api_error} = require('./custom-error');

class auth_error extends custom_api_error{
    constructor(message){ 
        super(message);
        this.status_code = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = { 
    auth_error
} 