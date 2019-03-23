import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {CreatePointDto} from './create-point.dto';

export class CreateGeolocationDto {

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiModelProperty({type: Number, required: true})
    @IsNumber()
    @IsNotEmpty()
    readonly number: number;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    readonly neighborhood: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    readonly state: string;

    @ApiModelProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    location: CreatePointDto;

}