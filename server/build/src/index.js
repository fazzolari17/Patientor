"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patient_1 = __importDefault(require("./routes/patient"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.static('front'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    console.log(`Someone Pinged Here`);
    res.status(200).send('pong');
});
app.get('/health', (_req, res) => {
    res.status(200).send('200 ok');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patient_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
