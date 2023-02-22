"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.NODE_ENV === 'development'
        ? process.env.DEVELOPMENT_MONGODB_URI
        : process.env.MONGODB_URI;
const setJwtExpirationTime = () => {
    const oneDay = 60 * 60 * 24;
    return oneDay;
};
exports.default = {
    MONGODB_URI,
    PORT,
    setJwtExpirationTime,
};
