const {custom_api_error} = require('./custom-error');
const {StatusCodes} = require("http-status-codes");

class bad_request extends custom_api_error{
    constructor(message){ 
        super(message);
        this.status_code = StatusCodes.BAD_REQUEST;
    }
}
module.exports = { 
    bad_request
}