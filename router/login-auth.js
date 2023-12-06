const express = require("express"); 
const router = express.Router(); 

router
    .route("/")
    .get((req,res)=>{ 
        console.log(req.body); 
        console.log("this is for getting");
        res.status(200).json({msg: "this is success"});
    })
    .post((req,res)=>{ 
        console.log("this is for posting"); 
        res.status(200).json({msg: "this is success"});
    })

module.exports = router