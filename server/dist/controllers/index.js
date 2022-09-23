"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const location_1 = __importDefault(require("./location"));
exports.default = () => {
    const api = (0, express_promise_router_1.default)();
    api.use('/location', (0, location_1.default)());
    return api;
};
