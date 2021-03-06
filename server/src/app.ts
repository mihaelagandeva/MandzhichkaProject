import express from "express";
import cors from "cors";
import { router } from "./router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
require('./db-config/db-config');

const DEFAULT_PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.use(fileUpload());

app.use('/api', router);

app.listen(process.env.port || DEFAULT_PORT, () => { console.log('Listening for requests!'); });
