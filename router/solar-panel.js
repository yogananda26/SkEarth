const express = require('express'); 
const router = express.Router();


// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get in solar-panel"); 
        res.end();
    })
    .post((req, res)=>{
        console.log("this is for posting solar-panel");
        res.end();
    })
module.exports = router;