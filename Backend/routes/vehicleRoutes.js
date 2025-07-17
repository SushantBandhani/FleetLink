const express=require("express")
const { addVehicle, getVehicle } = require("../controllers/vehicleController");

const router=express.Router()

router.post("/",addVehicle);
router.get("/available",getVehicle);

module.exports=router