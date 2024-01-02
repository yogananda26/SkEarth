const express = require("express")
const {get_user} = require("../controller/auth")
const router = express.Router();

const{authentication} = require("../middleware/authentication")

router
    .route("/")
    .get(authentication, get_user); 

module.exports = router; 