const express = require("express");
const router = express.Router();
const { GetForecast_weather,
    GetCurrent_weather } = require("../controller/fetching-weather")
const GetLonLat = require("../middleware/GetLonLat")

router
    .route('/')
    .post(GetLonLat);
router
    .route('/current')
    .post(GetLonLat, GetCurrent_weather);
router
    .route('/forecast')
    .post(GetLonLat, GetForecast_weather);

module.exports = router;