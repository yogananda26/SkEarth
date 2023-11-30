const express = require('express'); 
const router = express.Router();


// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get in report"); 
        res.end();
    })
    .post((req, res)=>{
        console.log("this is for posting in report");
        res.end();
    })
module.exports = router;