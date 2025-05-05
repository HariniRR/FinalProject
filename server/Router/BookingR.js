express = require("express");
const { createBooking, getAllBookings, getBookingById, updateBookingById, updateAllBookings, deleteBookingById, deleteAllBookings } = require("../Controller/BookingC");

const router = express.Router();
router.post("/createBooking",createBooking);
router.get("/getAllBookings", getAllBookings);
router.get("/getBooking/:id", getBookingById);
router.put("/updateBooking/:id", updateBookingById);
router.put("/updateAllBookings", updateAllBookings);
router.delete("/deleteBooking/:id", deleteBookingById);
router.delete("/deleteAllBookings", deleteAllBookings);

module.exports = router;

