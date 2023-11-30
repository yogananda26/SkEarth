const express = require('express'); 
const router = express.Router();


// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get in uv-index"); 
        res.end();
    })
    .post((req, res)=>{
        console.log("this is for posting uv-index");
        res.end();
    })
    
module.exports = router;