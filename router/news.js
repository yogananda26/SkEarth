const express = require('express'); 
const router = express.Router();



// this is for routing 
router
    .route('/')
    .get((req, res)=>{ 
        console.log("this is for get in news"); 
    })
    .post((req, res)=>{ 
        console.log("this is post for news");
    })

module.exports = router;  