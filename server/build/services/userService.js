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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createNewUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const existingUser =  await User.findOne({ email: body.email });
        // if (existingUser) {
        //   return {
        //     error: 'account already exists try logging in.'
        //   };
        // }
        const saltRounds = 10;
        const passwordHash = yield bcrypt_1.default.hash(body.password, saltRounds);
        const user = new user_1.default({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            passwordHash,
        });
        const savedUser = yield user.save();
        return savedUser;
    }
    catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        return { error: message };
    }
});
exports.default = {
    createNewUser,
};
