const {async_wrapper} = require("../middleware/async-wrapper");

const Calculate_UNIX = async_wrapper(async(req, res, next)=>{ 
    const curr_day = new Date().getDate();
    const curr_month = new Date().getMonth(); 
    const curr_year = new Date().getFullYear();

    // we use GMT +07.00 for jakarta
    const unix_time_start = new Date(curr_year, curr_month, curr_day).getTime()/1000;
    const unix_time_end = (new Date(curr_year, curr_month, curr_day).getTime() + (24*60*60*1000))/1000; 

    req.body.unix_time = {unix_time_start, unix_time_end};
    next();
})

module.exports = Calculate_UNIX; 