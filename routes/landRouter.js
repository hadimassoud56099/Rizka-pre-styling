const router = require("express").Router();
const {Governate} = require("../models/LandInfo");
const {District} = require("../models/LandInfo");
const {LandArea} = require("../models/LandInfo");
const {WaterSource} = require("../models/LandInfo");
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const key    = require("../config/keys").secret;
const authorize =require("../middleware/authorize");

//Post Requests

router.post("/land_waterSource",async(req,res)=>{
    const {option} = req.body;
    const newWaterSource= new WaterSource ({
   option,
    });
 const savedWaterSource = await newWaterSource.save();
 res.json({
    savedWaterSource,
})
 
 }
 );

 // Get Requests
 router.get("/getGovernate",async(req,res)=>{
     const governate= await Governate.find({});
     res.json(governate);
      });

 router.get("/getDistrict",async(req,res)=>{
   const district =await District.find({});
   res.json(district);
    });

    router.get("/getLandArea",async(req,res)=>{
       const landArea =await LandArea.find({});
       res.json(landArea);
        });

    router.get("/getWaterSource",async(req,res)=>{
    const waterSource = await WaterSource.find({});
    res.json(waterSource);
     });
   
 
 
 
 module.exports = router;