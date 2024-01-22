const express = require('express'); 
const router = express.Router();


// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get in terms-condition"); 
        res.end();
    })
    .post((req, res)=>{
        console.log("this is for posting in terms-condition");
        res.end();
    })
module.exports = router;