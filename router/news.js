const express = require('express'); 
const router = express.Router();
const {fetch_news} = require("../controller/fetching-news")



// this is for routing 
router
    .route('/')
    .get(fetch_news)

module.exports = router;  