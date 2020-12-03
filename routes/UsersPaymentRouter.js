const router = require("express").Router();
const UsersPayment = require ("../models/User'sPayment");
const authorize =require("../middleware/authorize");

router.post("/postPayment",async(req,res)=>{
    try{
        const {userID,userName,amount,date} = req.body;
        const newPayment = new UsersPayment({
            userID:userID,
            userName:userName,
            paymentAmount: amount,
            date:date
        });
        const savePayment= newPayment.save();
        res.json(savePayment);
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
})

router.get("/getPayment",authorize,async(req,res)=>{
    // console.log("userID",userID)
    console.log("req.user",req.user)
    try{ 
const getPaymentInfo = await UsersPayment.find({userID:req.user});

res.json(getPaymentInfo);}
catch (err){
    res.status(500).json({error:err.message});
}
})


module.exports = router;