import {Document} from 'mongoose';

export interface PointInterface extends Document {
    readonly type: string;
    readonly coordinates: [number];
}