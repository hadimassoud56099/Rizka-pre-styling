const mongoose = require ('mongoose');
const LandSchema = mongoose.Schema;
//Create Schema
const GovernateSchema = new LandSchema({
    option:{
        type:String,
    }
});
const DistrictSchema = new LandSchema({
    option:{
       type: String,
    }
});
const LandAreaSchema = new LandSchema({
    option:{
        type:String,
    }
})
const waterSourceSchema= new LandSchema({
    option:{
      type:String,
    }
})
 const assecibilitySchema =new LandSchema({
 })
 const typeOfExistingSchema =new LandSchema({
       })


     module.exports={
        District : mongoose.model("land_District",DistrictSchema),
        Governate : mongoose.model("land_governate", GovernateSchema),
        LandArea : mongoose.model("LandArea",LandAreaSchema),
        WaterSource:mongoose.model("land_waterSource",waterSourceSchema)
       
        
   
     }

        