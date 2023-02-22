"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const utils_1 = require("./utils");
const config_1 = __importDefault(require("./config"));
const start = Date.now();
const MONGODB_URI = (0, utils_1.parseString)('MONGODB_URI', config_1.default.MONGODB_URI);
logger_1.default.info('Connecting to', MONGODB_URI);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI);
        logger_1.default.info('connected to MongoDB');
        logger_1.default.info(`It has taken ${(Date.now() - start) / 1000} seconds to connect to Mongo_DB`);
    }
    catch (error) {
        if (typeof error === 'string') {
            logger_1.default.info(error);
        }
        else if (error instanceof Error) {
            logger_1.default.error('Error connecting to MongoDB:', error.message);
        }
    }
});
exports.default = connectToDatabase;
