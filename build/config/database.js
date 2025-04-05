"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '@Linuxcp+10',
    database: process.env.DB_DATABASE || 'abbey',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [(0, path_1.join)(__dirname, '../entities/**/*.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, '../migrations/**/*.{ts,js}')],
    subscribers: [(0, path_1.join)(__dirname, '../subscribers/**/*.{ts,js}')],
});
