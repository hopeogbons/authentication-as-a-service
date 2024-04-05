import mongoose from "mongoose"

require("dotenv").config()

const host: string = process.env.MONGO_HOST!
const port: string = process.env.MONGO_PORT!
const dbName: string = process.env.MONGO_NAME!

// Set up Mongoose connection to your MongoDB database
export const initializeMongoDB = async () => {
  try {
    const url = `${host}:${port}/${dbName}`
    await mongoose.connect(url)
    console.log(`MongoDB Connected: ${url}`)
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    process.exit(1)
  }
}
