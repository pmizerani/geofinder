import { Connection } from 'mongoose';
import {GeoLocationEntity} from '../entity/geolocation.entity';

export const GeolocationProviders = [
    {
        provide: 'GEOLOCATTION_MODEL',
        useFactory: (connection: Connection) => connection.model('GeoLocation', GeoLocationEntity),
        inject: ['MONGO_CONNECTION'],
    },
];