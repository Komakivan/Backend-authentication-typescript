import dotenv from 'dotenv'

// dotenv configuration
dotenv.config()

export default {
    port: 8000,
    dbUri: process.env.MONGO_URL,
    logLevel: "info",
}