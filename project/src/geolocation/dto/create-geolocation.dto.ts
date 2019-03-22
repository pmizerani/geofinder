import {IsNumber, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {CreatePointDto} from './create-point.dto';

export class CreateGeolocationDto {

    @ApiModelProperty({type: String})
    @IsString()
    readonly address: string;

    @ApiModelProperty({type: Number})
    @IsNumber()
    readonly number: number;

    @ApiModelProperty({type: String})
    @IsString()
    readonly neighborhood: string;

    @ApiModelProperty({type: String})
    @IsString()
    readonly city: string;

    @ApiModelProperty({type: String})
    @IsString()
    readonly state: string;

    @ApiModelProperty({type: String})
    @IsString()
    readonly country: string;

    @ApiModelProperty({ type: CreatePointDto })
    readonly location: CreatePointDto;

}