import {Module} from '@nestjs/common';
import {GeolocationController} from './geolocation.controller';
import {GeolocationService} from './service/geolocation.service';
import {GeolocationProviders} from './service/geolocation.providers';
import {DatabaseModule} from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [GeolocationController],
    providers: [GeolocationService, ...GeolocationProviders],
})
export class GeolocationModule {
}
