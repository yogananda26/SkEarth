const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// this is for ploting the model
const User = new mongoose.Schema({ 
    name: {
        type: String, 
        required: [true, 'please provide your name'], 
        maxlength: 50,
        minlength : 3
    },
    email : { 
        type: String, 
        required: [true, "please provide your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email', 
        ], 
        unique: true
    },
    password : { 
        type: String, 
        required:[true, "please provide your password"],
        minlength : 1
    },
    bio : {
        type : String, 
        default : `hello there`
    }, 
    following : [new mongoose.Schema({
        name : {
            default : null, 
            type: String
        },
        UserID : { 
            type : mongoose.Types.ObjectId, 
            required : [true, 'please provide follower userID']
        }
    }, {timestamps : true})]

}, {timestamps: true})

User.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

User.methods.create_JWT = function() { 
    const token = jwt.sign({
        UserID : this._id,
        name : this.name
    },process.env.PRIVATE_CODE,{ 
        expiresIn : '30d' 
    })
    return token; 
}
User.methods.check_password = async function(password){ 
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch; 
}

module.exports = mongoose.model("User", User); 




