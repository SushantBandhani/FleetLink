const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacityKg: {
        type: Number,
        required: true
    },
    tyres: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'inUse', 'not available'],
        default: 'available'
    },

}, { timestamps: true })

module.exports = mongoose.model("Vehicle", vehicleSchema);
