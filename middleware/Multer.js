const multer = require('multer')


// setting the storage
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        console.log(`${__dirname}` +  `/upload`);
        cb(null, `${__dirname}` +  `/upload`); 
    },
    filename : async(req, file, cb)=> {
        if(!file){
            cb(null, null);
        }
        cb(null, `${file.originalname}`);
    }
})
const upload = multer({storage : storage})

// this is feature if u want to upload multiple image for different form
const multiupload = upload.fields([
    {name : "upload-img", maxCount:2}, 
    {name : 'upload-file', maxCount:2}
]); 

module.exports = upload; 
