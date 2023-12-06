const express = require('express'); 
const router = express.Router();
const {thing} = require('../controller/token_web');
const {get_error} = require("../middleware/throws-error");
const {auth} = require("../middleware/unauth")

// this is for routing 
router
    .route('/')
    .get(thing, get_error)
    .post(auth, get_error)

module.exports = router; 