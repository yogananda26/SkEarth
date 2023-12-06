const express = require('express'); 
const {input_user} = require('../controller/auth')
const router = express.Router();

router 
    .route("/")
    .get((req, res)=>{ 
        console.log("this is for getting something bby");
        res.end();
    })
    .post(express.json(), input_user)
    

module.exports = router;