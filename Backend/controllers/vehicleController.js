const z = require("zod")
const Vehicle = require("../models/vehcile")

const vehicleInput = z.object({
    name: z.string(),
    capacityKg: z.number(),
    tyres: z.number()
})


async function addVehicle(req, res) {
    try {
        const parsedData = vehicleInput.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(411).json({ message: "Inputs are not valid" });
        }

        const { name, capacityKg, tyres } = parsedData.data;

        const newVehicle = new Vehicle({
            name,
            capacityKg,
            tyres
        })
        await newVehicle.save();
        res.status(200).json({ newVehicle });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

function getVehicle(req, res) {

}

module.exports = {
    addVehicle,
    getVehicle
}