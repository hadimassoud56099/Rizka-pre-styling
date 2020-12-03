const router = require("express").Router();
const UsersLand = require ("../models/User'sLand");
const authorize =require("../middleware/authorize")

router.post("/addLandInfo",async(req,res)=>{
    try{
        const {landOwnerID,landOwner,landInfo} = req.body;
        const newLand = new UsersLand({
            LandOwnerID:landOwnerID,
            LandOwnerName:landOwner,
             LandValues: landInfo,
        });
        const saveLandAdded= newLand.save();
        res.json(saveLandAdded);
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
})

router.get("/getMyLands",authorize,async(req,res)=>{
    try{
    const getLandInfo = await UsersLand.find({LandOwnerID:req.user});
    res.json(getLandInfo);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})


module.exports = router;