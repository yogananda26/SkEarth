const express = require("express");
const {make_message, 
    delete_message, 
    get_all_message,
    update_message, 
    get_some_message
} = require("../controller/task-message");
const {get_error} = require('../middleware/throws-error');
const router = express.Router();

4
router.use(express.json(), express.urlencoded());
router 
    .route('/')
    .get(get_all_message)
    .post(make_message); 

router
    .route("/:id")
    .patch(update_message, get_error)
    .delete(delete_message);


module.exports = router; 