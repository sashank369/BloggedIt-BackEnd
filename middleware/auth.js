const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // get the token from the header

        const isCustomAuth = token.length < 500; // check if the token is from google or not

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test'); // verify the token
            req.userId = decodedData?.id; // set the user id
        } else{
            decodedData = jwt.decode(token); // decode the token
            req.userId = decodedData?.sub; // set the user id
        }

        next(); // move on to the next middleware

    } catch (error) {
        logger.error(error);
    }
}

module.exports = auth;