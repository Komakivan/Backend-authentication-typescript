import mongoose from "mongoose";
import config from 'config'
import { log } from "./logger";

async function connectToDB() {
    const mongo_url= config.get<string>('dbUri')
    try {
        await mongoose.connect(mongo_url)
        log.info('Database successfully connected..')
    } catch (e) {
        process.exit(1)
    }
}

export { connectToDB }