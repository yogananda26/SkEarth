const express = require("express"); 
const router = express.Router();
const {GetAirPolution} = require("../controller/fetching-task")
const GetLonLat = require("../middleware/GetLonLat")
const calculate_unix = require("../middleware/Calculate_unix")
router
    .route('/')
    .get(GetLonLat, calculate_unix, GetAirPolution)
    .post(); 

module.exports = router; 