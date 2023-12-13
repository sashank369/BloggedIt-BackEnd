const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const mongoose = require('mongoose'); // import mongoose
const cors = require('cors'); // import cors
const dotenv = require('dotenv'); // import dotenv
const logger = require('./utils/logger.js'); // import logger

const blogRoutes = require('./routes/blogs.js'); // import routes
const userRoutes = require('./routes/users.js'); // import routes

const app = express(); // initialize express
dotenv.config(); // initialize dotenv

app.use(bodyParser.json({ limit: "30mb", extended: true })); // initialize body-parser
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // initialize body-parser

app.use(cors()); // initialize cors

app.use('/blogs', blogRoutes); // blog routes
app.use('/user', userRoutes); // user routes

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('MongoDB connection established');
    })
    .catch((error) => logger.error(`Error connecting to MongoDB: ${error.message}`));

const closeServer = async () => {
    try {
        // Close the server gracefully
        await server.close();
        
        // Close the MongoDB connection
        await mongoose.connection.close();

        logger.info('Server and MongoDB connection closed');
    } catch (error) {
        logger.error(`Error closing server and MongoDB connection: ${error.message}`);
    }
};

module.exports = { app, closeServer };
