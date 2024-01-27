const User = require('../model/User'); 
const {async_wrapper} = require('../middleware/async-wrapper')
const {bad_request} = require('../error/driver-error');


// this is for handling user profile

const update_profile = async_wrapper(async(req, res, next)=>{ 

    const get_user = req.user.UserID;
    const {new_bio, new_name} = req.body; 
    var update;

    const filter = {_id : get_user}

    if(new_bio && !new_name){
        update = User.findOneAndUpdate(filter,{
            bio : new_bio, 
            updatedAt : new Date()
        },{
            new:true
        })
    }
    else if(new_name && !new_bio){
        update = User.findOneAndUpdate(filter, {
            name : new_name, 
            updatedAt : new Date()
        },{
            new:true
        })
    }
    else if(new_name && new_bio) {
        update = User.findOneAndUpdate(filter, {
            bio : new_bio, 
            name : new_name,
            updatedAt : new Date()
        },{
            new:true
        })
    }
    const result = await update.exec(); 
    // console.log(get_user);
    return res.status(200).json(result)
})

module.exports = { 
    update_profile
}