const router = require("express").Router();
const User   = require("../models/User");
const mailer = require("../Mailer/mailer");
const configMailer = require("../config/configMailer");


const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const key    = require("../config/keys").secret;
const authorize =require("../middleware/authorize");
const randomString= require("randomstring");

router.post("/register", async (req, res)=>{
    try{
    let {name,email,password,passwordCheck} = req.body;
    //validate
    if(!email || !password || !passwordCheck )
    {
        return res.status(400).json({msg: "Not all Fields are Entered"});
    }
    if(password.length < 5)
    {
        return res.status(400).json({msg:"The password must be at least 5 characters long"});
    }
    if(password !== passwordCheck)
    {
        return res.status(400).json({msg:"Passwords Must Match!"})
    }
    const existingUser = await User.findOne({email: email})
    if(existingUser){
        return res.status(400).json({msg:"An account with this Email already exists"});
       
    }
    // if(!name) name = email;
        
   
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Email verification:1) Generate a Verification Token
    const email_token=randomString.generate();
    let verifyToken= email_token;
    console.log(verifyToken);
    //Email verification:2) Flag the account as inActive
    let active=false;

    const newUser = new User({
        email,
        password:passwordHash,
        name,
        verifyToken,
        active,
    });
    const savedUser = await newUser.save();
    const html=`Hi There,
    <br/>
    Thank you for registering!<br/><br/>
    Please Click the button below to activate your Account 
    <a href="http://localhost:3000/SignIn/${verifyToken}"><button>Activate Email</button>
   </a>
    <br/><br/>Have a pleasent Time!`;
    
    await mailer.sendMail('rizka.greenlebanon@gmail.com',savedUser.email,
    "RIZKA :Please Activate Your Account",html)
    res.json(savedUser);
} catch (err){
        res.status(500).json({error:err.message});
}

});
router.post("/login",async(req,res)=>{
    try{
        const{email,password} = req.body;
        //validate
        if(!email || !password){
            return res.status(400).json({msg:"Not All Fields Are Entered"});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"No account with this email has been registered"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"incorrect password"});
            
        }
        if(!user.active){
        return res.status(400).json({msg:"You should verify your Email"}); 
          }
         
        const token = jwt.sign({id:user._id},key,{expiresIn:"24h"});
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
            
        });
    }catch{
        res.status(500).json({error: err.message});
    }
})
router.post("/tokenValidate",async(req,res)=>{
    try{
        const token = req.header('jwt-token');
        if(!token){
            return res.json(false);
        }
        const verified = jwt.verify(token,key);
        if(!verified){
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }
        res.json(true);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})
router.get("/authorizedUser",authorize,async(req,res)=>{
   try{ const user = await User.findById(req.user);
    res.json({
        name:user.name,
        id:user._id,
        email:user.email
    })}catch(err){res.status(500).json({error:err.message})}
})
router.post("/sendEmailToken/:token", async(req,res)=>{
    try{ 
        let sentToken=req.params.token;
        console.log("req.params",req.params.token)
        console.log("SentToken",sentToken);

       
     const user=  await User.findOne({"verifyToken":sentToken});
     if(!user){
         res.status(400).json({msg:"Code Invalid"})
         return;
     }
     console.log(user);
     user.active=true;
     user.verifyToken="";
     await user.save();
     console.log(user);
     res.status(200).json(user)


    }catch(err){res.status(500).json({error:err.message})}
})

router.post("/ContactUs",async(req,res)=>{
    try{
        let userContact=req.body;
        console.log("Message",userContact)
        const msgHtml = `<b>Message to Rizka</b>
        <br/><br/> Sent By:${userContact.name}
        <br/> User mail :${userContact.email}
        <br/> Message:${userContact.message}`;
        
        await mailer.sendMail(userContact.email,"rizka.greenlebanon@gmail.com","Message From Rizka User",msgHtml)
        res.status(200).json(userContact.email);

    }catch(err){res.status(500).json({error:err.message})}
})







module.exports = router;