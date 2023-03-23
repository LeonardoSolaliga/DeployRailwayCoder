import winston from 'winston';

const customLevelsOptions = {
    levels:{
        error:0,
        warning:1,
        http:2,
        debug:3,
    }
}

const logger = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"debug"
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'warning.log',
            level: 'warning'
        })
    ]
})

export const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.error(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}