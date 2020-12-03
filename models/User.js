const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    verifyToken:{
        type:String,
        expires:'1d'
    },
    password:{
        type:String,
        required: true,
        minlength:5
    },
    active:{
        type:Boolean
    },
    date:{
        type:Date,
        default:Date.now
    }
});

User=mongoose.model("user", UserSchema);
module.exports = User