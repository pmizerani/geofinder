import {IsNotEmpty, IsNumberString, IsString, Min} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class FindGeolocationDto {

    @ApiModelProperty({type: Number, required: true})
    @IsNumberString()
    @IsNotEmpty()
    distance: number;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    lat: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    lng: string;

    @ApiModelProperty({type: Number, required: true})
    @IsNumberString()
    page: number;

    @ApiModelProperty({type: Number, required: true})
    @IsNumberString()
    size: number;

}