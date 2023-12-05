
class custom_api_error extends Error{ 
    constructor(message){ 
        super(message);
    }
}
module.exports = { 
    custom_api_error
}