import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"


await connectDB() // Establish connection to the database

const app = express() //Initialize Express Application
app.use(cors()) // Enables Cross_Origin Resource sharing

// middleware setup
app.use(express.json()) //Enables json request body parsing
app.use(clerkMiddleware())

// API to listen Clerk webhooks
app.use("/api/clerk", clerkWebhooks)

// Route Endpoint to check API Status
app.get('/', (req, res) => {
    res.send("API successfully connected")
})

const port = process.env.PORT || 4000 //Define server port

//start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))