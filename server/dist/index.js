"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers"));
const app = (0, express_1.default)();
const port = 8080;
app.use('/api', (0, controllers_1.default)());
app.listen(port, () => {
    console.log(`SERVER started on port ${port}`);
});
