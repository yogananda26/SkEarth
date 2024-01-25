const express = require("express")
const {get_user, get_all_user} = require("../controller/auth")
const router = express.Router();

const{authentication} = require("../middleware/authentication")

router
    .route("/")
    .get(authentication, get_user); 

router
    .route("/all-user")
    .get(authentication,get_all_user);
module.exports = router; 