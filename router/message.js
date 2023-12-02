const express = require("express");
const {make_message, 
    delete_message, 
    get_all_message,
    update_message, 
    get_some_message
} = require("../controller/task-message");
const throws_error = require('../middleware/throws-error');


const router = express.Router();
router.use(express.json(), express.urlencoded());
 
router 
    .route('/')
    .get((req, res)=>{
        console.log(req.params);
        res.end();
    })
    .post(make_message); 


router
    .route("/:id")
    .patch(update_message, throws_error)
    .delete(delete_message);


module.exports = router; 