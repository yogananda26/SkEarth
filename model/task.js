const mongoose = require('mongoose');

// this is for ploting the model
const user_schema = new mongoose.Schema(
{ 
    id : {
        type:Number, 
        required:[true, 'please provide id'],
        trim:true, 
        maxlength:[20, "please provide a new char bby"]
    }, 
    user : {
        name : String, 
        phone_number : Number, 
        address : String
    }
})
module.exports = mongoose.model('User', user_schema);




