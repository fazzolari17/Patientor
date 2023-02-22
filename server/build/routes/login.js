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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils/utils");
const config_1 = __importDefault(require("../utils/config"));
const loginRouter = express_1.default.Router();
loginRouter.post('/', ((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const userToLogin = yield user_1.default.findOne({
            email: body.email,
        });
        if (!userToLogin) {
            return response.status(400).json({
                error: 'user does not exist create an account',
            }).end();
        }
        const passwordCorrect = userToLogin === null
            ? false
            : yield bcrypt_1.default.compare(body.password, userToLogin.passwordHash);
        if (!(userToLogin && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password',
            });
        }
        const userForToken = {
            email: userToLogin.email,
            id: userToLogin._id,
        };
        const secret = (0, utils_1.parseString)('process.env.SECRET', process.env.SECRET);
        const token = jsonwebtoken_1.default.sign(userForToken, secret, { expiresIn: config_1.default.setJwtExpirationTime() });
        return response.status(200).send({
            token,
            email: userToLogin.email,
            firstName: userToLogin.firstName,
            lastName: userToLogin.lastName,
            id: userToLogin._id,
        });
    }
    catch (error) {
        console.log('ERROR', { error });
        return response.end().status(400).send({ error }).end();
    }
})));
exports.default = loginRouter;
