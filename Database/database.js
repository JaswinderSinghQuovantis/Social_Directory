const dbConfig = require('../Config/config');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, {
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});