const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const logger = require('../utils/logger.js');

module.exports = {
    // Sign in the user
    signin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                logger.error("User doesn't exist");
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                logger.error("Invalid credentials");
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
            logger.info("User signed in successfully");
            res.status(200).json({ result: user, token });
        } catch (error) {
            logger.error("Something went wrong", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    // Sign up the user
    signup: async (req, res) => {
        const { email, password, confirmPassword, firstName, lastName } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                logger.error("User already exists");
                return res.status(400).json({ message: "User already exists" });
            }

            if (password !== confirmPassword) {
                logger.error("Passwords don't match");
                return res.status(400).json({ message: "Passwords don't match" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

            const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h" });
            logger.info("User signed up successfully");
            res.status(200).json({ result: newUser, token });

        } catch (error) {
            logger.error("Something went wrong", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}