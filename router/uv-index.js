const express = require('express'); 
const router = express.Router();
const GetLonLat = require("../middleware/GetLonLat");
const {GetUV_index} = require("../controller/fetching-task");


// this is for routing 
router
    .route('/')
    .get(GetLonLat,GetUV_index)
    .post((req, res)=>{
        console.log("this is for posting uv-index");
        res.end();
    })
    
module.exports = router;