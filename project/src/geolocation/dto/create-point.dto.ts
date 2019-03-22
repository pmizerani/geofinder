import {IsArray, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreatePointDto {

    @ApiModelProperty({type: String, enum: ['Point']})
    @IsString()
    readonly type: string;

    @ApiModelProperty({ type: [Number] })
    @IsArray()
    readonly coordinates: [number];

}