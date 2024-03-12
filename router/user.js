const express = require("express")
const {get_user, get_all_user, get_user_registered} = require("../controller/auth"); 
const update_profile = require('../controller/Settings_Message')
const router = express.Router();
const{authentication} = require("../middleware/authentication")
const upload = require('../middleware/Multer')

router
    .route("/")
    .get(authentication, get_user); 

router
    .route("/registered")
    .get(authentication, get_user_registered)
router
    .route("/all-user")
    .get(authentication,get_all_user);

router
    .route('/setting')
    .patch(authentication, upload.none() ,update_profile)
module.exports = router; 