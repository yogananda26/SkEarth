// this is for fetching the API forecast 
const {async_wrapper} = require('../middleware/async-wrapper');
const {bad_request} = require("../error/driver-error");



const GetUV_index = async_wrapper(async(req, res)=>{ 
    const {latitude, longitude}  = req.body.requirement; 
    const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;

    fetch(API_URL)
        .then((result)=>{ 
            if(!result) throw new bad_request("something wrong in GetUV_index");
            return result.json();
        })
        .then((obj)=>{ 
            let result;
            let uv_result;
    
            uv_result = obj.hourly.map(({uvi})=>{ 
                return uvi
            })

            res.status(200).json(uv_result);
        })
})

const GetAirPolution = async_wrapper(async(req, res)=>{ 
    const {longitude, latitude} = req.body.requirement;
    const {unix_time_start, unix_time_end} = req.body.unix_time
    console.log(unix_time_start, unix_time_end);
    const API_URL = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${unix_time_start}&end=${unix_time_end}&appid=${process.env.API_KEY}`; 
    fetch(API_URL)
        .then((result)=>{
            if(!result)throw new bad_request("something error in GetAirPolution");
            return result.json();
        })
        .then((obj)=>{
            // let result = obj['list'].map(({components})=>{
            //     return components
            // })
            return res.json(obj);
        })
})


const GetCurrent_weather = async_wrapper(async(req, res)=>{ 
    
})


module.exports = { 
 GetUV_index, GetCurrent_weather, GetAirPolution
}