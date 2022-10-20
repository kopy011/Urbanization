import { Location } from "../types/location";
import locationModel from "../models/location"


export class LocationService {
    async getLocations(): Promise<Location[]>{
        const locations = await locationModel.find({});

        return locations;
    }

    async createLocation(locationData: Location): Promise<void> {
        try {
            const location = new locationModel(locationData)
            await location.save();
        } catch(ex){
            throw ex;
        }
    }

    async importLocations(locations: Location[]): Promise<void> {
        try{
            for(let i=0; i<locations.length; i++){
                const mongoLocation = new locationModel(locations[i]);
                await mongoLocation.save();
            }
        } catch(ex){
            throw ex;
        }
    }
}