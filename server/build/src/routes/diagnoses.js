"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_req, res) => {
    console.log('Diagnoses Page');
    res.send(diagnosesService_1.default.getDiagnoses());
});
exports.default = diagnosesRouter;
