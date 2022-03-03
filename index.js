const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
// Configuring the database
require('./Database/database')

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Social Directories"});
});

// listen for requests
app.listen(process.env.Port, () => {
    console.log(`Server is listening on port ${process.env.Port}`);
});