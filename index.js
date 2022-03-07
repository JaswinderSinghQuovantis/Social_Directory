import express, { json } from 'express';
import { config } from 'dotenv';
config()
import cors from 'cors';
import { logger } from './logger/logger.js'

// Configuring the database
import './database/database.js'

// create express app
const app = express();
app.use(cors())

// parse requests of content-type - application/json
app.use(json());

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Social Directories" });
});

// Require Notes routes
import routes from './app/route/route.js' 
const route = routes(app);

// listen for requests
app.listen(process.env.Port, () => {
    logger.info(`Server is listening on port ${process.env.Port}`);
});

export default app;