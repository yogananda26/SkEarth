const express = require("express");
const router = express.Router();
const { GetForecast_weather,
    GetCity_Curr,
    GetCurrent_weather} = require("../controller/fetching-weather")
const GetLonLat = require("../middleware/GetLonLat")
// const GetCityCurr = require("../middleware/GetCityCurr");
// const GetForecasts = require("../middleware/GetCityCurr");

router
    .route('/')
    .post(GetLonLat);
router
    .route('/current')
    .post(GetLonLat, GetCurrent_weather);
router
    .route('/forecast')
    .post(GetLonLat, GetForecast_weather);
router
    .route('/city')
    .post(GetCity_Curr);

module.exports = router;