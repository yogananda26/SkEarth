const { async_wrapper } = require("../middleware/async-wrapper");
const { bad_request } = require("../error/driver-error");

const GetForecasts = async_wrapper(async (req, res, next) => {
    const { latitude, longitude } = req.body;
    if (!latitude && !longitude) {
        throw new bad_request("please input your latitude and longitude");
    }
    const API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${process.env.API_KEY}`

    const fetching = await fetch(API_URL);
    const data = await fetching.json();
    const citys = Object.entries(data)[0][1].name
    // const longitude = Object.entries(data)[0][1].lon

    req.body.requirement = { citys };
    console.log(req.body.requirement);
    next();

})

module.exports = GetForecasts;   