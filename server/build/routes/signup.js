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
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
const user_1 = __importDefault(require("../models/user"));
const userRouter = express_1.default.Router();
userRouter.post('/', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const existingUser = yield user_1.default.findOne({
        email: body.email,
    });
    if (existingUser) {
        return res.status(400).json({
            error: 'account already exists try logging in.',
        });
    }
    const newUser = yield userService_1.default.createNewUser(body);
    return res.status(200).send(newUser);
})));
// userRouter.get('/', async (request, response) => {
//   const users = await User
//     .find({})
//     .populate('blog', 'title author url likes')
//   response.json(users)
// })
exports.default = userRouter;
