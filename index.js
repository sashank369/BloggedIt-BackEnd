const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const mongoose = require('mongoose'); // import mongoose
const cors = require('cors'); // import cors
const dotenv = require('dotenv'); // import dotenv

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

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))) // listen to port 5000
    .catch((error) => console.log(error.message));

module.exports = { app };

console.log("Hello World"); // print Hello World