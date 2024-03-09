const express = require('express'); 
const router = express.Router();
const GetLonLat = require("../middleware/GetLonLat");
const {GetUV_index} = require("../controller/fetching-weather");


// this is for routing 
router
    .route('/')
    .get()
    .post(GetLonLat,GetUV_index)
module.exports = router;