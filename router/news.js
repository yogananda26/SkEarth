const express = require('express'); 
const router = express.Router();


// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get request"); 
        res.end();
    })
    .post((req, res)=>{
        console.log("this is for posting something");
        res.end();
    })

module.exports = router;