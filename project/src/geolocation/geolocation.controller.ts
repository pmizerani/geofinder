import {Body, Controller, Get, HttpStatus, Post, Query, Res} from '@nestjs/common';
import {ApiImplicitQuery, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateGeolocationDto} from './dto/create-geolocation.dto';
import {GeolocationService} from './service/geolocation.service';
import {GeolocationQueryInterface} from './interfaces/geolocation-query.interface';
import {number} from 'joi';
import {Response} from 'express';
import {GeolocationInterface} from './interfaces/geolocation.interface';

@ApiUseTags('geolocation')
@Controller('geolocation')
export class GeolocationController {
    constructor(private readonly geolocationService: GeolocationService) {}

    @Post()
    @ApiOperation({title: 'Create'})
    @ApiResponse({status: 201, description: 'Ok.'})
    @ApiResponse({status: 400, description: 'Bad Request.'})
    @ApiResponse({status: 500, description: 'Internal Server Error.'})
    async create(@Body() createGeolocationDto: CreateGeolocationDto, @Res() res: Response) {

        const response = await this.geolocationService.create(createGeolocationDto);
        if (null === response) res.status(HttpStatus.BAD_REQUEST).json({message: 'Address not found on GoogleMapsAPI.'});
        else res.status(HttpStatus.CREATED).json(response);
    }

    @Get()
    @ApiOperation({title: 'Find all'})
    @ApiResponse({status: 200, description: 'Ok.'})
    @ApiResponse({status: 204, description: 'No content.'})
    @ApiResponse({status: 500, description: 'Internal Server Error.'})
    @ApiImplicitQuery({name: 'size', type: number, required: true, description: 'Size'})
    @ApiImplicitQuery({name: 'page', type: number, required: true, description: 'Page - First is 1'})
    @ApiImplicitQuery({name: 'distance', type: number, required: true, description: 'Distance in meters'})
    @ApiImplicitQuery({name: 'lng', type: number, required: true, description: 'Longitude'})
    @ApiImplicitQuery({name: 'lat', type: number, required: true, description: 'Latitude'})
    async findAll(@Query() geoLocationQuery: GeolocationQueryInterface, @Res() res: Response) {

        const listResponse = await this.geolocationService.findAll(geoLocationQuery);

        if (!listResponse || 0 === listResponse.length) res.status(HttpStatus.NO_CONTENT).send();
        else res.status(HttpStatus.OK).json(listResponse);

    }
}
