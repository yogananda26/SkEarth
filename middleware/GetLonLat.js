const { async_wrapper } = require("../middleware/async-wrapper");
const { bad_request } = require("../error/driver-error");

const GetForecast = async_wrapper(async (req, res, next) => {
    const { city_name } = req.body;

    if (!city_name) {
        throw new bad_request("please input your country name");
    }
    const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${1}&appid=${process.env.API_KEY}`

    const fetching = await fetch(API_URL);
    const data = await fetching.json();
    const latitude = Object.entries(data)[0][1].lat
    const longitude = Object.entries(data)[0][1].lon

    req.body.requirement = { latitude, longitude };
    next(); 

})

module.exports = GetForecast;   