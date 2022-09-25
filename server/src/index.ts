import { Express } from "express";
import express from "express"
import api from "./controllers"
import locationModel from "../src/models/location"
import mongoose from "mongoose";


const app: Express = express();
const port: number = 8080;

app.use(express.json());

app.use('/api', api());

mongoose.connect('mongodb://localhost:27017/Urbanization', (err) => {
    if(!err){
        console.log('Connected to database succesfully!');
    } else {
        console.log(err.message);
    }
});

//init collections
locationModel.createCollection();

app.listen(port, () => {
    console.log(`SERVER started on port ${port}`)
});