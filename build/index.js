"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const controllers_1 = __importDefault(require("./controllers"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const logStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../logs', 'abbey.log'), { flags: 'a' });
app.use((0, morgan_1.default)('common', { stream: logStream }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', controllers_1.default);
app.get('/', (req, res) => {
    res.json({ status: 'OK' });
});
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => console.log('Database connection error: ', error));
