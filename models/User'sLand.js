const mongoose = require ('mongoose');
const UsersLandSchema = mongoose.Schema;

const usersLand= new UsersLandSchema({

    LandOwnerID:{
        type:String,
        required:true,
    },
    LandOwnerName:{
        type:String,
        required:true,
    },
    LandValues:{
        type:Object,
        required:true,
    }

})

module.exports = UsersLand = mongoose.model("Users_Land_Info",usersLand);
