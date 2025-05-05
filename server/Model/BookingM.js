const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    time: { type: String, required: true },
    counsellorName: { type: String, required: true },
    counsellorContact: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);