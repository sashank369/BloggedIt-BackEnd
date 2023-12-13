const {
    createLogger,
    transports,
    format
} = require('winston');

// Create me a logger that is very much usefull for the user to understand it and generate it in such a way that its very well formated and easily understandable and generate a combined logger as well
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/warn.log',
            level: 'warn',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/combined.log',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;