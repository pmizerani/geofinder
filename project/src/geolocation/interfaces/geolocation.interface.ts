import {Document} from 'mongoose';
import {PointInterface} from './point.interface';

export interface GeolocationInterface extends Document{
    readonly address: string;
    readonly number: number;
    readonly neighborhood: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly location: PointInterface;
}