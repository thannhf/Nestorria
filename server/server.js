import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import agencyRouter from "./routes/agencyRoute.js"
import propertyRouter from "./routes/propertyRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"

await connectDB() // Establish connection to the database
await connectCloudinary() // setup cloudinary for image storage

const app = express() //Initialize Express Application
app.use(cors()) // Enables Cross_Origin Resource sharing

// API to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

// middleware setup
app.use(express.json()) //Enables json request body parsing
app.use(clerkMiddleware())

// API to listen Clerk webhooks
app.use("/api/clerk", clerkWebhooks)

// Define API routes
app.use('/api/user', userRouter)
app.use('/api/agencies', agencyRouter)
app.use('/api/properties', propertyRouter)
app.use('/api/bookings', bookingRouter)

// Route Endpoint to check API Status
app.get('/', (req, res) => {
    res.send("API successfully connected")
})

const port = process.env.PORT || 4000 //Define server port

//start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))