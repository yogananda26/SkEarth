const mongoose = require('mongoose'); 
// this is for connection for database 
const connect = (url) =>{ 
    return mongoose.connect(url);
}
module.exports = connect; 