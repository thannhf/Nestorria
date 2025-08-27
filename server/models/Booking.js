import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: {type: String, required: true},
    property: {type: String, ref:"Property", required: true},
    agency: {type: String, ref: "Agency", required: true},
    checkInDate: {type: Date, required: true},
    checkOutDate: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    guests: {type: Number, required: true},
    status: {type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending"},
    paymentMethod: {type: String, required: true, default: "Pay at Check-in"},
    isPaid: {type: Boolean, default: false},
}, {timestamps: true})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking