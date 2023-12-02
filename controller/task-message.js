const express = require('express'); 
const axios = require("axios");
const message = require('../model/input-message'); 
const async_wrapper = require('../middleware/async-wrapper')
const {API_error_handler} = require('../middleware/error-handlers')

// this is the task
const make_message = async_wrapper(async(req, res)=>{
    const data = await message.create(req.body); 
    return res.status(200).json({data});
})
const get_all_message = async_wrapper(async(req, res)=>{  
    const res_message = await message.find({});
    return res.status(200).json(res_message);
})
const delete_message = async_wrapper(async(req, res)=>{ 
    const value = await message.findOneAndDelete({_id : userID}); 
    return res.status(200).json({status : 'success' , msg : `success deleted your message ${userID}`});
})
const update_message = async_wrapper(async(req, res, next)=> { 
    const {id} = req.params;
    if(req.body = {}){ 
        return next(API_error_handler("please provide body in HTML", 404));
    } 
    const person = await message.findOneAndUpdate({_id : valueID}, req.body, {
        new : true,
        runValidators : true
    })
    return res.status(200).json({msg : `you updatted the user with id : ${id}`}, person);
})
// this is for searching the unique message
const get_some_message = async_wrapper(async(req, res)=>{ 
    const { id: userID } = req.params;
    const search = await message.find({ 
        id : 8080
    })
    console.log("this is testing");
    return res.status(200).json({data : Number(id)});

})


module.exports = { 
    make_message,
    delete_message,
    get_all_message,
    update_message,
    get_some_message
}