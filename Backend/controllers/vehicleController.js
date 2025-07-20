const z = require("zod")
const Vehicle = require("../models/vehcile");
const Booking = require("../models/booking")


const vehicleInput = z.object({
    name: z.string()
        .trim()
        .min(3, "Name must be 3 characters long")
        .regex(/^(?=.*[a-zA-Z])[a-zA-Z\s]{3,}$/, "Name must contain only letters and at least one alphabet"),
    capacityKg: z.number().positive("Capacity must be a postive"),
    tyres: z.number().int().min(4, "There must be atleast four tyre"),
    status: z.enum(['available', 'inUse', 'not available']).optional()
})

const searchInput = z.object({
    capacity: z.number(),
    fromPincode: z.string().length(6, "fromPincode must be 6 digits"),
    toPincode: z.string().length(6, "toPincode must be 6 digits"),
    startTime: z
        .string()
        .refine((str) => /^\d{4}-\d{2}-\d{2}$/.test(str), {
            message: "Invalid date format. Use yyyy-mm-dd",
        })
        .refine((date) => { return date >= new Date().toISOString().split('T')[0] })
        .transform((str) => new Date(str))

})

async function addVehicle(req, res) {
    try {
        const parsedData = vehicleInput.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "Inputs are not valid",
                errors: parsedData.error.issues.map((issue) => issue.message).join(" | ")
            });
        }

        const { name, capacityKg, tyres, status } = parsedData.data;

        const newVehicle = new Vehicle({
            name,
            capacityKg,
            tyres,
            status
        })
        await newVehicle.save();
        res.status(201).json({ newVehicle });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

async function getVehicle(req, res) {
    try {
        const { capacity, fromPincode, toPincode, startTime: bookingStartTime } = req.query;
        const bookTime = new Date(bookingStartTime);

        if (!Number(capacity) || !Number(fromPincode) || !Number(toPincode) || !bookingStartTime) {
            return res.status(400).json({
                message: "Validation failed, please send valid data",
                errors: "Please provide correct details"
            });
        }

        const parsedObj = Object.entries(req.query).reduce((acc, [key, value]) => {
            if (key === 'startTime') {
                acc[key] = value;
            } else if (key === 'capacity') {
                acc[key] = Number(value);
            }
            else {
                acc[key] = value
            }
            return acc;
        }, {});


        const parsedData = searchInput.safeParse(parsedObj);
        if (!parsedData.success) {
            console.log("parsedData error --> ", parsedData.error);

            return res.status(400).json({
                message: "Inputs are not valid",
                errors: parsedData.error.issues.map((issue) => issue.message).join(" | ")
            });
        }

        // const { capacity, fromPincode, toPincode, startTime: bookingStartTime } = req.query;
        const bookingSearchResults = await Booking.find({
            $or: [
                { endTime: { $lt: bookTime } },

                { startTime: { $gt: bookTime } }
            ]
        });

        const bookedVehicleIds = await Booking.distinct("vehicleId");
        const availableVehicleIds = bookingSearchResults.map(b => b.vehicleId);


        const unbookedVehicles = await Vehicle.find({
            $or: [
                { _id: { $nin: bookedVehicleIds } },
                { _id: { $in: availableVehicleIds } }
            ],
            capacityKg: { $gte: capacity }
        });


        return res.status(200).json({
            message: { "SearchItems": unbookedVehicles }
        })
    }
    catch (err) {
        console.error("Booking search failed:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = {
    addVehicle,
    getVehicle
}