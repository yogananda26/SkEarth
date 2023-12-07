const express = require('express'); 
const {login} = require('../controller/auth')
const router = express.Router();

router 
    .route("/")
    .get((req, res)=>{ 
        console.log("this is for getting something bby");
        res.end();
    })
    .post(express.json())
    

module.exports = router;