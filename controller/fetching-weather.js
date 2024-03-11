// this is for fetching the API forecast 
const { async_wrapper } = require('../middleware/async-wrapper');
const { bad_request } = require("../error/driver-error");


const GetUV_index = async_wrapper(async (req, res) => {
    const { latitude, longitude } = req.body.requirement;
    const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if (!result) throw new bad_request("something wrong in GetUV_index");
            return result.json();
        })
        .then((obj) => {
        
            // this is for forecast
            uv_forecast = obj.hourly.map(({uvi, dt})=>{ 
                return {uvi, dt};
            })
            uv_current = obj.current.uvi; 
            const hasil = {
                "uv_current" : uv_current, 
                "uv_forecast_2_days" : uv_forecast
            }
            // this is for result
            res.status(200).json(hasil);
        })
})


const get_air_polution = async(res, req, next) => {
    const { longitude, latitude } = req.body.requirement;
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`;
    const response = await fetch(url);
    if(!response){
        throw new bad_request("failed for fetching the API_get_air_polution")
    }
    const data = await response.json();
    return res.status(200).json(data.list[0].main.aqi); // Assuming you want the current AQI
}

const GetAirPolution = async_wrapper(async (req, res) => {
    const { longitude, latitude } = req.body.requirement;
    const { unix_time_start, unix_time_end } = req.body.unix_time
    console.log(unix_time_start, unix_time_end);
    const API_URL = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${unix_time_start}&end=${unix_time_end}&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if (!result) throw new bad_request("something error in GetAirPolution");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
            // let result = obj['list'].map(({components})=>{
            //     return components
            // })
            // return res.json(result);
        })
})

const GetForecastAirPolution = async_wrapper(async (req, res) => {
    const { longitude, latitude } = req.body.requirement;
    const API_URL = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if (!result) throw new bad_request("something error in GetForecastAirPolution");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
            // let result = obj['list'].map(({components})=>{
            //     return components
            // })
            // return res.json(result);
        })
})

const GetCurrentAirPolution = async_wrapper(async (req, res) => {
    const { longitude, latitude } = req.body.requirement;
    const API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if (!result) throw new bad_request("something error in GetCurrentAirPolution");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
            // let result = obj['list'].map(({components})=>{
            //     return components
            // })
            // return res.json(result);
            // let result = obj['list'].map(({main})=>{
            //     return main.aqi
            // })
            // return res.json(result);
        })
})

const GetCurrent_weather = async_wrapper(async (req, res) => {
    
    const {longitude, latitude} = req.body.requirement;
    
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if(!result) throw new bad_request("Error found in GetCurrentWeather");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
        })
})

const GetForecast_weather = async_wrapper(async (req, res) => {
    const {longitude, latitude} = req.body.requirement;
    const API_URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result) => {
            if(!result) throw new bad_request("Error found in GetForecastWeather");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
        })
})

const GetCity_Curr = async_wrapper(async (req, res) => {
    const { latitude, longitude } = req.body;
    const API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${process.env.API_KEY}`

    fetch(API_URL)
        .then((result) => {
            if(!result) throw new bad_request("Error found in GetForecastWeather");
            return result.json();
        })
        .then((obj) => {
            return res.json(obj);
        })
})

const solar_panel = async_wrapper(async(req, res, next)=>{
    const {longitude, latitude} = req.body.requirement;

    const API_URL = `https://api.openweathermap.org/energy/1.0/solar/data?lat=${latitude}&lon=${longitude}&date=2023-03-28&appid=${process.env.API_KEY}`; 
    fetch(API_URL)
        .then((result)=>{
            if(!result) throw new bad_request("Error found in GetForecastWeather");
            return result.json();
        })
        .then((obj)=>{
            return res.json(obj);
        })
})



module.exports = {
    GetUV_index, 
    GetCurrent_weather, 
    GetAirPolution, 
    GetForecastAirPolution, 
    GetCurrentAirPolution,
    GetCurrent_weather,
    GetForecast_weather, 
    GetCity_Curr,
    solar_panel
}