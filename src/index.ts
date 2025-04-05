import 'reflect-metadata';
import express, { Express } from 'express';
import { AppDataSource } from './config/database';
import IndexController from './controllers';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const logStream = fs.createWriteStream(path.join(__dirname, '../logs', 'abbey.log'), { flags: 'a' });
app.use(morgan('common', { stream: logStream }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', IndexController);
app.get('/', (req, res) => {
  res.json({ status: 'OK' })
});
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Database connection error: ', error));
