const fs = require('fs')
const {async_wrapper} = require('../middleware/async-wrapper');
const MongoClient = require('mongodb').MongoClient, 
      mongodb = require("mongodb");   

// this is for upload the image

const setup_gate = async(URI, bucketName)=>{

    // @set-up gate for connecting the database
    const client = await MongoClient.connect(URI); 
    const db = client.db("GridFs");
    const bucket = new mongodb.GridFSBucket(db, {bucketName : bucketName});  
    return bucket;
}

const upload_image = async_wrapper(async(req, res, next)=>{

    // @connecting the database
    const stream = setup_gate(process.env.MONGO_GRIDFS, 'new_thing')
    console.log(req.message_id);
    // if user didnt upload an image or something like that
    if(!req.file && !req.files){
        res.status(200).json("everything is good, but u dont post a picture")
    }
    // @create the stream
    const files = req.files;

    files.map(async(data) =>{ 
        fs.createReadStream(data.path)
        .pipe((await stream).openUploadStream(data.filename,{
            chunkSizeBytes : 261120,
            metadata: {
                name : data.filename, 
                size : data.size, 
                type : data.mimetype, 
                belongTo : req.message_id
            }
        }))
        })
    res.status(200).json({msg: 'success'});
})

const search_img = async_wrapper(async(req, res, next)=>{

    // @connecting the database
    const stream = setup_gate(process.env.MONGO_GRIDFS, "new_thing")
    const data = (await stream).find({});
    var array_result = []; 

    // this is for pushing every image that user have
    for await (const result of data) { 
        if(!(req.params.commentID === result.metadata.belongTo)) continue; 
        array_result.push(result);
    }
    // console.log(array_result);
    res.status(200).json(array_result);
})
const render_image_video = async_wrapper(async(req, res, next)=>{

    // @connecting the database
    const stream = await setup_gate(process.env.MONGO_GRIDFS, "new_thing")

    // this is for rendering image or video that user have
    stream.openDownloadStreamByName(req.params.filename).pipe(res);
})

const delete_image = async_wrapper(async(req, res, next)=>{
    
    // @this is for connecting the database
    const stream = await setup_gate(process.env.MONGO_GRIDFS, 'new_thing');
    const filename = req.params.filename;
    await stream.delete(filename);
    res.status(200).json({ message: 'Image deleted successfully' });
})

module.exports = {
    upload_image,
    render_image_video, 
    search_img, 
    delete_image
}; 