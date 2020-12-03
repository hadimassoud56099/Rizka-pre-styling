const mongoose = require ('mongoose');
const UsersPaymentSchema = mongoose.Schema;

const usersPayment= new UsersPaymentSchema({

    userID:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    paymentAmount:{
        type:Number,
        required:true
    },
    date:{
        type:String,
       
    }

})

module.exports = UsersPayment = mongoose.model("Users_Payment_Info",usersPayment);
