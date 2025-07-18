const z = require("zod")
const Vehicle = require("../models/vehcile")
const Booking = require("../models/booking")


const bookingInput = z.object({
    vehicleId: z.string().min(1, "vehicleId is required"),
    fromPincode: z.string().length(6, "fromPincode must be 6 digits"),
    toPincode: z.string().length(6, "toPincode must be 6 digits"),
    startTime: z
        .string()
        .refine((str) => /^\d{4}-\d{2}-\d{2}$/.test(str), {
            message: "Invalid date format. Use yyyy-mm-dd",
        })
        .refine((date) => { return date >= new Date().toISOString().split('T')[0] })
        .transform((str) => new Date(str)),
    endTime: z
        .string()
        .refine((str) => /^\d{4}-\d{2}-\d{2}$/.test(str), {
            message: "Invalid date format. Use yyyy-mm-dd",
        })
        .transform((str) => new Date(str)),
    customerId: z.string().optional().default(() => new mongoose.Types.ObjectId().toString())  // setting it default as of now

});

async function addBookingDetails(req, res) {
    try {

        const parsedData = bookingInput.safeParse(req.body);
        if (!parsedData.success) {
            console.log("parsedDara error --> ", parsedData.error)
            console.log("parsedDara error22 --> ", parsedData.error.fieldErrors)
            const fieldErrors = Object.values(parsedData.error.flatten().fieldErrors).flat();

            return res.status(400).json({
                error: "Validation failed, please correctly fill all fields",
                details: fieldErrors
            });
        }

        const { vehicleId, fromPincode, toPincode, startTime, endTime, customerId } = req.body;
        if (startTime > endTime) {
            return res.status(400).json({
                error: "Start date cant be greator that end date",
            });
        }

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        if (vehicle.status !== "available") {
            return res.status(400).json({ error: "Vehicle is not available" });
        }

        const estimatedHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
        const bookingStartTime = new Date(startTime);
        const bookingEndTime = new Date(bookingStartTime.getTime() + estimatedHours * 60 * 60 * 1000);
        const isoverlappingBooking = await Booking.findOne({
            vehicleId,
            $or: [
                {
                    startTime: { $lt: bookingEndTime },
                    endTime: { $gt: bookingStartTime }
                }
            ]
        });
        console.log(bookingStartTime, bookingEndTime, isoverlappingBooking)

        if (isoverlappingBooking) {
            return res.status(409).json({ error: "Vehicle is already booked during this time." });
        }
        const booking = await Booking.create({
            vehicleId,
            fromPincode,
            toPincode,
            startTime: bookingStartTime,
            endTime: bookingEndTime,
            customerId
        });

        res.status(201).json({ message: "Booking created successfully", booking });

    } catch (err) {
        console.error("Booking creation failed:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = {
    addBookingDetails,
}