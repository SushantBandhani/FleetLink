const z = require("zod")
const Vehicle = require("../models/vehcile")

// using zod validation to ensure required fields have correct types
const vehicleInput = z.object({
    name: z.string()
        .trim()
        .min(3, "Name must be 3 characters long")
        .regex(/^(?=.*[a-zA-Z])[a-zA-Z\s]{3,}$/, "Name must contain only letters and at least one alphabet"),
    capacityKg: z.number().positive("Capacity must be a postive"),
    tyres: z.number().int().min(4, "There must be atleast four tyre"),
    status:z.enum( ['available', 'inUse', 'not available']).optional()
})


async function addVehicle(req, res) {
    try {
        const parsedData = vehicleInput.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(411).json({
                message: "Inputs are not valid",
                errors: parsedData.error.errors
            });
        }

        const { name, capacityKg, tyres,status } = parsedData.data;

        const newVehicle = new Vehicle({
            name,
            capacityKg,
            tyres,
            status
        })
        await newVehicle.save();
        res.status(200).json({ newVehicle });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

async function getVehicle(req, res) {
    try {
        const vehicleDetails=await Vehicle.find({status:"available"});
        if(vehicleDetails.length===0){
            return res.status(404).json({
                message: "Not available"
            })
        }
    return res.status(200).json({ vehicleDetails })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    addVehicle,
    getVehicle
}