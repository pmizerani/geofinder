import {Body, Controller, Get, HttpStatus, Post, Query, Res} from '@nestjs/common';
import {ApiImplicitQuery, ApiOkResponse, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateGeolocationDto} from './dto/create-geolocation.dto';
import {GeolocationService} from './service/geolocation.service';
import {GeolocationInterface} from './interfaces/geolocation.interface';
import {GeolocationQueryInterface} from './interfaces/geolocation-query.interface';
import {description, number} from 'joi';
import {Response} from 'express';

@ApiUseTags('geolocation')
@Controller('geolocation')
export class GeolocationController {
    constructor(private readonly geolocationService: GeolocationService) {}

    @Post()
    @ApiOperation({title: 'Create'})
    @ApiResponse({status: 201, description: 'Success.'})
    @ApiResponse({status: 403, description: 'Permission denied.'})
    async create(@Body() createGeolocationDto: CreateGeolocationDto) {
        this.geolocationService.create(createGeolocationDto);
    }

    @Get()
    @ApiOperation({title: 'Find all'})
    @ApiResponse({status: 200, description: 'Success'})
    @ApiResponse({status: 403, description: 'Permission Denied.'})
    @ApiImplicitQuery({name: 'distance', type: number, required: true, description: 'Distance in meters'})
    @ApiImplicitQuery({name: 'lng', type: number, required: true, description: 'Longitude'})
    @ApiImplicitQuery({name: 'lat', type: number, required: true, description: 'Latitude'})
    async findAll(@Query() geoLocationQuery: GeolocationQueryInterface, @Res() res: Response) {

        const listResponse = <GeolocationInterface[]> await this.geolocationService.findAll(geoLocationQuery);

        if (!listResponse || 0 === listResponse.length) res.status(HttpStatus.NO_CONTENT).send();
        else res.status(HttpStatus.OK).json(listResponse);

    }
}
