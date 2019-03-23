import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {GeolocationInterface} from '../interfaces/geolocation.interface';
import {CreateGeolocationDto} from '../dto/create-geolocation.dto';
import {GeolocationQueryInterface} from '../interfaces/geolocation-query.interface';
import {ConfigService} from '../../config/config.service';
import * as request from 'request';
import {GeoinfoInterface} from '../interfaces/geoinfo.interface';
import {CreatePointDto} from '../dto/create-point.dto';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

@Injectable()
export class GeolocationService {
    constructor(
        @Inject('GEOLOCATTION_MODEL') private readonly geolocationModel: Model<GeolocationInterface>
    ) {}

    /**
     * create
     *
     * @param {CreateGeolocationDto} createGeolocationDto
     * @returns {Promise<GeolocationInterface>}
     */
    async create(createGeolocationDto: CreateGeolocationDto): Promise<GeolocationInterface> {

        const geoInfo = <GeoinfoInterface> await this.findGoogleMapsAPI(`${createGeolocationDto.address},${createGeolocationDto.number},${createGeolocationDto.neighborhood},${createGeolocationDto.city},${createGeolocationDto.state},${createGeolocationDto.country}`);

        if (null === geoInfo) return null;

        createGeolocationDto.location = <CreatePointDto>{type: "", coordinates: []};
        createGeolocationDto.location.type = 'Point';
        createGeolocationDto.location.coordinates = [geoInfo.lat, geoInfo.lng];

        const createdGeolcation = new this.geolocationModel(createGeolocationDto);
        return await createdGeolcation.save();
    }

    /**
     * findAll
     *
     * @param {GeolocationQueryInterface} geoLocationQuery
     * @returns {Promise<any>}
     */
    async findAll(geoLocationQuery: GeolocationQueryInterface): Promise<any> {

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

    /**
     * findGoogleMapsAPI
     *
     * @param {String} address
     * @returns {Promise<any>}
     */
    async findGoogleMapsAPI(address: String) {

        //&address=Av.%20Tambor%C3%A9,267,Alphaville%20Industrial&language=pt-BR
        //&latlng=-23.5035725,-46.84478619&language=pt-BR

        const googleUrl = `${configService.config.GOOGLE_MAPS_HOST + configService.config.GOOGLE_MAPS_PATH}?key=${configService.config.GOOGLE_MAPS_KEY}&address=${address}&language=pt-BR`;

        try {

            return await new Promise((resolve, reject) => {

                // Execute request to GoogleMaps API
                request.get(encodeURI(googleUrl), (error, response, body) => {

                    if (error) reject(error);

                    try {

                        let json = JSON.parse(body);

                        // Check if exist results
                        if (!json.results || json.results.length === 0) reject("Address not found.");

                        console.log(json.results[0].geometry.location);
                        resolve(json.results[0].geometry.location);

                    } catch (e) {
                        reject(e);
                    }

                });

            });

        } catch (e) {
            console.log(`Failed GET Google Maps. --- Address: ${address}`);
            return null;
        }

    }


}