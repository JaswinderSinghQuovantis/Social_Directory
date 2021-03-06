import databaseurl  from '../config/config.js'
import mongoose from 'mongoose';
import { logger } from '../logger/logger.js'

// Connecting to the database
mongoose.connect(databaseurl)
    .then(() => {
        logger.info("Successfully connected to the database");
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });  