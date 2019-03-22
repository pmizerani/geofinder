import * as mongoosePaginate from 'mongoose-paginate';
import * as mongoose from 'mongoose';
import * as PointEntity from './point.entity';

export const GeoLocationEntity = new mongoose.Schema({
    address: String,
    number: Number,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
    location: {
        type: PointEntity,
        required: true
    }
}).index({ location: "2dsphere" })
    .plugin(mongoosePaginate);