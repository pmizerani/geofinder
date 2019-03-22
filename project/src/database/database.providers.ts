import * as mongoose from 'mongoose';
import {ConfigService} from '../config/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

export const databaseProviders = [
    {
        provide: 'MONGO_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
             await mongoose.connect(`mongodb://${configService.config.MONGO_HOST}:${configService.config.MONGO_PORT}/${configService.config.MONGO_DATABASE}`, {useNewUrlParser: true}),
    },
];