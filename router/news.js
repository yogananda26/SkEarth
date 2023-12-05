const express = require('express'); 
const router = express.Router();
const {thing} = require('../controller/token_web');
const {get_error} = require("../middleware/throws-error");
router.use(express.json(), express.urlencoded());

// this is for routing 
router
    .route('/')
    .get(thing, get_error)
    .post((req, res)=>{
        console.log("this is for posting something");
        res.end();
    })

module.exports = router; 