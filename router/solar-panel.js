const express = require('express'); 
const router = express.Router();
const {solar_panel} = require('../controller/fetching-weather')
const Calculate_unix = require("../middleware/Calculate_unix")
const GetLonLat = require("../middleware/GetLonLat")

// this is for routing 
router
    .route('/')
    .get(GetLonLat, Calculate_unix, solar_panel)
    .post()
module.exports = router;