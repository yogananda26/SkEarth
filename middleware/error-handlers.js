class asycn_error extends Error{ 
    constructor(message, status){ 
        super(message);
        this.status = status;
    }
}
const API_error_handler = (message, status) =>{ 
    return new asycn_error(message, status); 
}

module.exports = { 
    asycn_error, API_error_handler
}