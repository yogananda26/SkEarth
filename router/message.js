const express = require("express");
const {make_message, 
    delete_message, 
    get_all_message,
    update_message, 
    get_unique_message,
    show_all_replies,
    replies_the_message
} = require("../controller/task-message");
const router = express.Router();
const {authentication} = require("../middleware/authentication")

router 
    .route('/')
    .get(authentication, get_all_message)
    .post(authentication, make_message); 

router
    .route("/unique/:UserID")
    .get(authentication, get_unique_message)
    .patch(authentication, update_message)
    .delete(authentication, delete_message);

router
    .route("/comment/:commentID")
    .get(authentication, show_all_replies)
    .post(authentication, replies_the_message)

module.exports = router; 