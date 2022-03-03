import express, { json } from 'express';
import { config } from 'dotenv';
config()
import { logger } from './logger/logger.js'

// Configuring the database
import './database/database.js'

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(json());

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Social Directories" });
});

// listen for requests
app.listen(process.env.port, () => {
    logger.info(`Server is listening on port ${process.env.Port}`);
});