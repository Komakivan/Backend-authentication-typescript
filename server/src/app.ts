require('dotenv').config();
import express from 'express';
import config from 'config';
import { connectToDB } from './utils/connectToDB';
import { log } from './utils/logger';
import { router } from './routes';


const app = express();

app.use(router)

const port = config.get('port')

function startServer() {
    connectToDB()
    app.listen(port, () => {
        log.info(`Starting server at ${port}...`)
    })
}

startServer()