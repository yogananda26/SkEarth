const mongoose = require('mongoose'); 

const message_schema = new mongoose.Schema(
{ 
    id : {
        type:Number, 
        trim:true, 
        required:[true, 'please provide your id'], 
        maxlength:[20, 'please not more than 20 char long']
    },
    types: {type:String, required :[true, "please provide your type"]},
    history:{ 
        date : {type:Date, default: Date.now()}, 
        content:{
            type:String, 
            maxlength: [10000  , 'please not more than 1000 word']
        }
    }
})

module.exports = mongoose.model('History_Chat', message_schema); 