import {IsNumber, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {CreatePointDto} from './create-point.dto';

export class CreateGeolocationDto {

    @ApiModelProperty({type: String, required: true})
    @IsString()
    readonly address: string;

    @ApiModelProperty({type: Number, required: true})
    @IsNumber()
    readonly number: number;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    readonly neighborhood: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    readonly city: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    readonly state: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    readonly country: string;

    location: CreatePointDto;

}