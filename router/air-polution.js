const express = require("express"); 
const router = express.Router();
const {GetAirPolution, 
    GetForecastAirPolution,
    GetCurrentAirPolution} = require("../controller/fetching-weather")
const GetLonLat = require("../middleware/GetLonLat")
const calculate_unix = require("../middleware/Calculate_unix")
router
    .route('/')
    .post(GetLonLat, calculate_unix, GetAirPolution); 
router
    .route('/current')
    .post(GetLonLat, GetCurrentAirPolution);
router
    .route('/forecast')
    .post(GetLonLat, GetForecastAirPolution);

module.exports = router; 