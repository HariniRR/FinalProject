const Booking = require("../Model/BookingM");

exports.createBooking = async (req, res) => {
    const { name, email, time, contact, counsellorName, counsellorContact } = req.body;

    if (!name || !email || !time || !contact || !counsellorName || !counsellorContact) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newBooking = new Booking({
            name,
            email,
            time,
            contact,
            counsellorName,
            counsellorContact,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking" });
    }
};
// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking" });
    }
};

// Update booking by ID
exports.updateBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking" });
    }
};

// Update all bookings
exports.updateAllBookings = async (req, res) => {
    try {
        const updatedBookings = await Booking.updateMany({}, req.body);
        res.status(200).json(updatedBookings);
    } catch (error) {
        res.status(500).json({ message: "Error updating bookings" });
    }
};

// Delete booking by ID
exports.deleteBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking" });
    }
};

// Delete all bookings
exports.deleteAllBookings = async (req, res) => {
    try {
        await Booking.deleteMany({});
        res.status(200).json({ message: "All bookings deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting bookings" });
    }
};