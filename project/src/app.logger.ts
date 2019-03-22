import { LoggerService } from '@nestjs/common';
const opts = {
    errorEventName:'error',
    logDirectory:'logs', // NOTE: pasta deve existir e ter permissao de escrita
    fileNamePattern:'error_log-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
import * as log from 'simple-node-logger';
const logger = log.createRollingFileLogger( opts );

export class AppLogger implements LoggerService {
    log(message: string) {}
    error(message: string, trace: string) {

        logger.info(message + ' - ' + trace);

    }
    warn(message: string) {
        console.log('warning')
    }
}