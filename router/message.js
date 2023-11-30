const express = require("express");
const {make_message, 
    delete_message, 
    get_all_message,
    update_message
} = require("../controller/task")


const router = express.Router();
router.use(express.json(), express.urlencoded());

router 
    .route("/")
    .get(get_all_message)
    .post(make_message);

// this is for deleting the thing in from server 
router
    .route("/:id")
    .patch(update_message)
    .delete(delete_message)
    
module.exports = router; 