import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    email: {type: String, required: true},
    owner: {type: String, ref: "User", required: true},
    city: {type: String, required: true},
}, {timestamps: true})

const Agency = mongoose.model("Agency", agencySchema)

export default Agency