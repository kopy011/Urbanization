import Router  from "express-promise-router";

export default () => { 
    const api = Router();

    api.get('/hello-world', async (req, res) =>{
        res.send("Hello world from location controller!").status(200);
    })

    return api;
};