// this is a basic of server in node js 
const express = require('express'); 
const app = express();
const database = require('../database/main');
const {get_error} = require('../middleware/throws-error');
require('dotenv').config(); 


// this is for accessing the data in every route
const user = require("../router/user");
const route_message = require('../router/message');
const route_forecast = require('../router/forecast');
const route_news = require('../router/news');
const route_report = require('../router/report');
const route_solar = require('../router/solar-panel'); 
const route_UV = require('../router/uv-index');
const route_auth = require("../router/auth");
const route_air_polution = require("../router/air-polution");


// this is for accesing the route/ and using the middleware
app.use(express.static('./front-end'));
app.use(express.json(), express.urlencoded());
app.use('/user', user); 
app.use('/api/v1/message',route_message);
app.use('/api/v1/forecast',route_forecast)
app.use('/api/v1/uv-index',route_UV);
app.use('/api/v1/news',route_news); 
app.use('/api/v1/solar',route_solar);
app.use('/api/v1/air-polution', route_air_polution); 
app.use('/api/v1/report-FnQ',route_report)
app.use('/auth', route_auth);



// this is for handling the error
app.use(get_error);

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

