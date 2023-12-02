import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // import dotenv

import blogRoutes from './routes/blogs.js'; // import routes
import userRoutes from './routes/users.js'; // import routes

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