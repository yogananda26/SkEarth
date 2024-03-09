
const message = require('../model/input-message'); 
const {async_wrapper} = require('../middleware/async-wrapper')
const {bad_request, auth_error} = require('../error/driver-error');
const { json } = require('express');

// this is the task
const make_message = async_wrapper(async(req, res, next)=>{
    req.body.createdBy = req.user.UserID;
    console.log(req.body);
    const data = await message.create(req.body);
    // this is for passing the message _id
    req.message_id = await data.get_id();
    next();
})
const get_all_message = async_wrapper(async(req, res)=>{  
    const res_message = await message.find({});
    // this is for finding the message that user make
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
  
    const result = await message.find({ 
        createdBy : UserID
    })
    if(!result){
        throw new Error("Message Not Found That Created By This User");
    }
    // this is for searching the comment for every comment
    const search_all_comment = await message.find({})

    // for storage the unique reply and message that user make before
    const all_message = [];

    result.map((data)=>{
        all_message.push(data) ; 
    })
    search_all_comment.forEach((result)=>{
        result.reply.map((data)=>{
            if((data.replyBy == UserID) || (result.createdBy != UserID)){ 
                all_message.push(result);
            }
        })
    })
    // this for destructing
    res.status(200).json(all_message.filter(((v, i, self)=>{
        return i == self.indexOf(v);
    })))
})

const replies_the_message = async_wrapper(async(req, res, next)=>{ 
    const {commentID} = req.params;
    if(!commentID){
        throw new bad_request("your message never found or created before");
    } 
    const parent = await message.findOne({
        _id : commentID
    })
    const {comment} = req.body
    parent.reply.push({
        replyBy : req.user.UserID, 
        comment : comment
    })
    console.log(req.body);
    // this is for saving the document 
    parent.save();
    res.status(200).json(parent)
})

const show_all_replies = async_wrapper(async(req, res, next)=>{ 
    const {commentID} = req.params; 
    const data = await message.findOne({
        _id : commentID
    })
    // console.log(data);
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