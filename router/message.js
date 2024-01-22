const express = require("express");
const {make_message, 
    delete_message, 
    get_all_message,
    update_message, 
    get_some_message
} = require("../controller/task-message");
const router = express.Router();
const {authentication} = require("../middleware/authentication")

router 
    .route('/')
    .get(authentication, get_all_message)
    .post(authentication, make_message); 

router
    .route("/:id")
    .patch(authentication, update_message)
    .delete(authentication, delete_message);


module.exports = router; 