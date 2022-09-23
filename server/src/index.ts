import { Express } from "express";
import express from "express"
import api from "./controllers"


const app: Express = express();
const port: number = 8080;

const dbo = require('../database/conn');

app.use('/api', api())

dbo.connectToServer((err: unknown) =>{
    if(err){
        console.error(err);
        process.exit();
    }

    app.listen(port, () => {
        console.log(`SERVER started on port ${port}`)
    });
});