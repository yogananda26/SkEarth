const express = require('express'); 
const axios = require("axios");
const message = require('../model/input-message'); 
const async_wrapper = require('../middleware/async-wrapper')

// this is the task
const make_message = async_wrapper(async(req, res)=>{
    const data = await message.create(req.body); 
    res.status(200).json({data});
})
const get_all_message = async_wrapper(async(req, res)=>{  
    const thing  = await message.find({});
    res.status(200).json(thing);
})
const delete_message = async_wrapper(async(req, res)=>{ 
    const {id : userID} = req.params; 
    const value = await message.findOneAndDelete({_id : userID}); 
    res.status(200).json({status : 'success' , msg : `success deleted your message ${userID}`});
})
const update_message = async_wrapper(async(req, res)=> { 
    const {id : valueID} = req.params; 
    const person = await message.findOneAndUpdate({_id : valueID}, req.body, {
        new : true,
        runValidators : true
    })
    res.status(200).json({msg : `you updatted the user with id : ${valueID}`}, person);
})


module.exports = { 
    make_message,
    delete_message,
    get_all_message,
    update_message
}