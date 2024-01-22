const mongoose = require('mongoose'); 

const message_schema = new mongoose.Schema(
{ 
    content:{
        required : [true, "please input your message"],
        type:String, 
        maxlength: [10000  , 'please not more than 1000 word']
    },
    createdBy : {
        type: mongoose.Types.ObjectId, 
        required : [true, "please provide user"], 
        ref : 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('History_Chat', message_schema); 