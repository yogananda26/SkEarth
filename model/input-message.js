const mongoose = require('mongoose'); 


const replay_schema = new mongoose.Schema({ 
    comment: {
        type : String,
        default : 'There is no Comment Available'
    }, 
    replyBy : {
        type : mongoose.Types.ObjectId
    }
}, {timestamps: true})


const message_schema = new mongoose.Schema(
{ 
    content:{
        required : [true, "please input your message"],
        type:String, 
        maxlength: [10000  , 'please not more than 1000 word'],
    },
    createdBy : {
        type: mongoose.Types.ObjectId, 
        required : [true, "please provide user"], 
        ref : 'User'
    }, 
    reply : [{
        type : replay_schema, 
        default : () => ({})
    }]
}, {timestamps : true})

message_schema.methods.get_id = async function(){
    return `${this._id}`; 
}
module.exports = mongoose.model('History_Chat', message_schema); 