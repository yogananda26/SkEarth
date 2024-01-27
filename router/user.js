const express = require("express")
const {get_user, get_all_user} = require("../controller/auth"); 
const {update_profile} = require('../controller/setting_profile')
const router = express.Router();
const{authentication} = require("../middleware/authentication")

router
    .route("/")
    .get(authentication, get_user); 

router
    .route("/all-user")
    .get(authentication,get_all_user);

router
    .route('/setting')
    .patch(authentication, update_profile)
module.exports = router; 