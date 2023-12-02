const express = require("express");
const template = require('../model/task');

const input_user = async(req,res)=>{
    try{ 
        const data = await template.create(req.body);
        return res.status(200).json({data});  
    }catch(err){ 
        console.log(`there is a error ${err}`);
        return res.end('please input your JSON file...')
    }
}

module.exports = { 
    input_user
} 

vgvg