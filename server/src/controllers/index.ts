import Router  from "express-promise-router";
import location from "./location";

export default () => { 
    const api = Router();

    api.use('/location', location())

    return api;
};