const express = require('express'); 
const {login} = require('../controller/auth')
const router = express.Router();
const GetLonLat = require("../middleware/GetLonLat");


router 
    .route("/")
    .get()
    .post()

    
module.exports = router;