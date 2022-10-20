import Router  from "express-promise-router";
import { locationService } from "../services";
import { Location } from "../types/location";

export default () => { 
    const api = Router();

    api.get('/hello-world', async (req, res) => {
        res.send("Hello world from location controller!").status(200);
    })

    api.get('/', async (req, res) => {
        const locations: Location[] = await locationService.getLocations();
        res.json(locations);
    });

    api.post('/save', async (req, res) => {
        const locationData: Location = req.body;
        
        //csekkolni van e id-ja 
        //ha van update ha nincs create

        try {
            await locationService.createLocation(locationData);
            res.sendStatus(200);
        } catch(err: any){
            res.status(400).send(err.message);
        }
    });

    api.post('/import', async (req, res) => {
        const locations: Location[] = req.body; 
        try {
            await locationService.importLocations(locations);
            res.sendStatus(200);
        } catch(err: any){
            res.status(400).send(err.message);
        }
    });

    return api;
};