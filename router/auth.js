const express = require("express"); 
const router = express.Router(); 
const {logIn, signUp} = require('../controller/auth');
const {authentication} = require("../middleware/authentication");
const { route } = require("./news");

router
    .route("/Login")
    .post(logIn)
router
    .route("/SignUp")
    .post(signUp)

module.exports = router