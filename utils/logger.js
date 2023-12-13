const { createLogger, transports, format } = require('winston');
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/backend_info.log',
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'logs/backend_error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'logs/backend_warn.log',
            level: 'warn',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'logs/backend_combined.log',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
});

module.exports = logger;