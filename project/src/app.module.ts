import {Module} from '@nestjs/common';
import {GeolocationModule} from './geolocation/geolocation.module';

@Module({
    imports: [GeolocationModule],
})
export class ApplicationModule {
}
