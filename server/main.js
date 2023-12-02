// this is a basic of server in node js 
const express = require('express'); 
const app = express();
const {product} = require('../database/storage');
const {createReadStream} = require('fs');
const database = require('../database/main');
require('dotenv').config(); 


// this is for accessing the data in every route
const route_message = require('../router/message');
const route_forecast = require('../router/forecast');
const route_news = require('../router/news');
const route_report = require('../router/report');
const route_solar = require('../router/solar-panel'); 
const route_UV = require('../router/uv-index');


// this is for accesing the route
app.use('/message',route_message);
app.use('/forecast',route_forecast)
app.use('/uv-index',route_UV);
app.use('/news',route_news); 
app.use('/solar',route_solar);
app.use('/report-FnQ',route_report)

// this is for making the connection to localhost on port 1234
app.listen(2000 ,()=>{ ``
console.log('this is your server side is running .... '); 
});

// invoked the database
const connect = async(url)=>{ 
    try{ 
        await database(url); 
        console.log("your database successfull yeah");
    }catch(err){ 
        console.log(err)
    }
}
connect(process.env.MONGO_URL);

