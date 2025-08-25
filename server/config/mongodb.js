import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("success database connected");
    } catch(error) {
        console.log("Error connect database failed", error.message)
    }
}

export default connectDB