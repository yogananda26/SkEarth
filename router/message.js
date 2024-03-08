const express = require("express");
const { make_message, 
        delete_message, 
        get_all_message,
        update_message, 
        get_unique_message,
        show_all_replies,
        replies_the_message
} = require("../controller/Message_Control");

const router = express.Router();
const {authentication} = require("../middleware/authentication");

const { upload_image,
        search_img, 
        render_image_video, 
        delete_image
} = require("../controller/GridFs_SetUp")

const upload = require('../middleware/Multer')



router 
    .route('/')
    .get(authentication, get_all_message)
    .post(authentication, upload.array('image-upload', 5) , make_message, upload_image); 

router
    .route('/img/:commentID')
    .get(authentication ,search_img)

router
    .route('/img/render/:filename')
    .get(render_image_video);

router
    .route("/unique/:UserID")
    .get(authentication, get_unique_message)
    .patch(authentication, update_message)
    .delete(authentication, delete_message);

router
    .route("/comment/:commentID")
    .get(show_all_replies)
    .post(authentication, replies_the_message)

module.exports = router; 