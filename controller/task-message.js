
const message = require('../model/input-message'); 
const {async_wrapper} = require('../middleware/async-wrapper')
const {bad_request} = require('../error/driver-error')

// this is the task
const make_message = async_wrapper(async(req, res)=>{
    req.body.createdBy = req.user.UserID;
    console.log(req.body);
    const data = await message.create(req.body);
    res.status(200).json({ msg : "oke"});
})
const get_all_message = async_wrapper(async(req, res)=>{  
    const res_message = await message.find({});
    res.status(200).json(res_message);
})
const delete_message = async_wrapper(async(req, res)=>{ 
    // this is for extract the user 
    const{UserID, name} = req.user
    
    const value = await message.findOneAndDelete({_id : userID}); 
    res.status(200).json({status : 'success' , msg : `success deleted your message ${userID}`});
})
const update_message = async_wrapper(async(req, res, next)=> { 
    const {userID} = req.params;
    if(req.body = {}){ 
        throw new bad_request("please provide body in HTML");
    } 
    const person = await message.findOneAndUpdate({_id : userID}, req.body, {
        new : true,
        runValidators : true
    })
    res.status(200).json({msg : `you updatted the user with id : ${userID}`}, person);
})
// this is for searching the unique message
const get_unique_message = async_wrapper(async(req, res)=>{ 
    const { UserID } = req.params;
    const search = await message.find({ 
        createdBy : UserID
    })
    console.log(UserID);
    res.status(200).json({id : UserID ,data: search});
})

const replies_the_message = async_wrapper(async(req, res, next)=>{ 
    const {commentID} = req.params; 
    const parent = await message.findOne({
        _id : commentID
    })
    const {comment} = req.body
    parent.reply.push({
        replyBy : req.user.UserID, 
        comment : comment
    })
    console.log(Array.isArray(parent.reply))
    // this is for saving the document 
    const updated = parent.save();

    res.status(200).json(parent)
})
const show_all_replies = async_wrapper(async(req, res, next)=>{ 
    const {commentID} = req.params; 
    const data = await message.findOne({
        _id : commentID
    })
    console.log(data)
    res.status(200).json(data);
})

module.exports = { 
    make_message,
    delete_message,
    get_all_message,
    update_message,
    get_unique_message, 
    replies_the_message, 
    show_all_replies
}