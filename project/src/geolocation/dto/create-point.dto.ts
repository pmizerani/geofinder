import {IsArray, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreatePointDto {

    @ApiModelProperty({type: String, enum: ['Point']})
    @IsString()
    type: string;

    @ApiModelProperty({ type: [Number] })
    @IsArray()
    coordinates: [number, number];

}