"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("./utils");
const requestLogger = (request, _response, next) => {
    const requests = request;
    logger_1.default.info('Method', requests.method);
    logger_1.default.info('Path', requests.path);
    logger_1.default.info('Body', requests.body);
    logger_1.default.info('Token', requests.token);
    logger_1.default.info('User', requests.user);
    logger_1.default.info('---');
    next();
};
const userExtractor = (request, response, next) => {
    const requests = request;
    // const token = parseString('middleware token', requests.token);
    const secret = (0, utils_1.parseString)('process.env.SECRET', process.env.SECRET);
    const decodedToken = jsonwebtoken_1.default.verify(requests.token, secret);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requests.user = decodedToken.id;
    }
    return next();
};
const tokenExtractor = (request, _response, next) => {
    const requests = request;
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        requests.token = authorization.substring(7);
    }
    next();
};
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _request, response, next) => {
    const errorMessage = (0, utils_1.parseString)('error.message', error.message);
    logger_1.default.error(errorMessage);
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id',
        });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: errorMessage,
        });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token',
        });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).send({
            error: 'token expired',
        });
    }
    return next(error);
};
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
