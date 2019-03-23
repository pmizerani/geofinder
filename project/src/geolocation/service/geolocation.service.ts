import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {GeolocationInterface} from '../interfaces/geolocation.interface';
import {CreateGeolocationDto} from '../dto/create-geolocation.dto';
import {ConfigService} from '../../config/config.service';
import * as request from 'request';
import {GeoinfoInterface} from '../interfaces/geoinfo.interface';
import {CreatePointDto} from '../dto/create-point.dto';
import {FindGeolocationDto} from '../dto/find-geolocation.dto';

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
    async create(createGeolocationDto: CreateGeolocationDto) {

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
     * @param {FindGeolocationDto} findGeolocationDto
     * @returns {Promise<any>}
     */
    async findAll(findGeolocationDto: FindGeolocationDto) {

        let locationListPaginate;

        try {
            locationListPaginate = await this.geolocationModel.paginate({
                location: {
                    $near: {
                        $maxDistance: parseInt(findGeolocationDto.distance.toString()),
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(findGeolocationDto.lat.toString()), parseFloat(findGeolocationDto.lng.toString())]
                        }
                    }
                }
            }, {
                page: (findGeolocationDto.page && findGeolocationDto.page >= 1) ? parseInt(findGeolocationDto.page.toString()) : 1,
                limit: findGeolocationDto.size ? parseInt(findGeolocationDto.size.toString()) : 50
            });
        } catch (e) {
            console.log(e);
            return null;
        }

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