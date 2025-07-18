const express=require("express");
const { addBookingDetails, getBookingDetails } = require("../controllers/bookingController");

const router=express.Router()

// router.get("/",getBookingDetails);
router.post("/",addBookingDetails);

module.exports=router