import mongoose from "mongoose";
import { Location } from "../types/location";

const locationSchema = new mongoose.Schema<Location>({
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    diagonal: {
        type: Number,
        required: true
    }
})

export default mongoose.model<Location>('Location', locationSchema, 'locations');