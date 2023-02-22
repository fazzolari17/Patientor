"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import 'express-async-errors';
const databaseConnection_1 = __importDefault(require("./utils/databaseConnection"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patient_1 = __importDefault(require("./routes/patient"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
void (0, databaseConnection_1.default)();
app.use(express_1.default.static('front'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.default.tokenExtractor);
app.use(middleware_1.default.requestLogger);
app.get('/api/ping', (_req, res) => {
    console.log(`Someone Pinged Here`);
    res.status(200).send('pong');
});
app.get('/api/health', (_req, res) => {
    res.status(200).send('200 ok');
});
app.use('/api/signup', signup_1.default);
app.use('/api/login', login_1.default);
app.use('/api/diagnoses', middleware_1.default.userExtractor, diagnoses_1.default);
app.use('/api/patients', middleware_1.default.userExtractor, patient_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
