import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {GeolocationInterface} from '../interfaces/geolocation.interface';
import {CreateGeolocationDto} from '../dto/create-geolocation.dto';
import {GeolocationQueryInterface} from '../interfaces/geolocation-query.interface';

@Injectable()
export class GeolocationService {
    constructor(@Inject('GEOLOCATTION_MODEL') private readonly geolocationModel: Model<GeolocationInterface>) {}

    /**
     * create
     *
     * @param {CreateGeolocationDto} createGeolocationDto
     * @returns {Promise<GeolocationInterface>}
     */
    async create(createGeolocationDto: CreateGeolocationDto): Promise<GeolocationInterface> {
        const createdGeolcation = new this.geolocationModel(createGeolocationDto);
        return await createdGeolcation.save();
    }

    /**
     * findAll
     *
     * @param {GeolocationQueryInterface} geoLocationQuery
     * @returns {Promise<GeolocationInterface[]>}
     */
    async findAll(geoLocationQuery: GeolocationQueryInterface): Promise<GeolocationInterface[]> {


        const locationListPaginate = await this.geolocationModel.paginate({
            location: {
                $near: {
                    $maxDistance: parseInt(geoLocationQuery.distance.toString()),
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(geoLocationQuery.lat.toString()), parseFloat(geoLocationQuery.lng.toString())]
                    }
                }
            }
        }, { page: (geoLocationQuery.page && geoLocationQuery.page >= 1) ? parseInt(geoLocationQuery.page.toString()) : 1, limit: geoLocationQuery.size ? parseInt(geoLocationQuery.size.toString()) : 50 });

        const listGeolocationInterface: GeolocationInterface[] = locationListPaginate.docs.map(geo => {
            return <GeolocationInterface>{
                address: geo.address,
                number: geo.number,
                neighborhood: geo.neightborhood,
                city: geo.city,
                state: geo.state,
                country: geo.country,
                location: geo.location
            };
        });

        locationListPaginate.docs = listGeolocationInterface;

        return locationListPaginate;
    }
}