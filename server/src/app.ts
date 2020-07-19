import express from "express";
import cors from "cors";
import { router } from "./router";
import bodyParser from "body-parser";
require('./db-config/db-config');
const DEFAULT_PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use('/api', router);

app.listen(process.env.port || DEFAULT_PORT, () => { console.log('Listening for requests!'); });
