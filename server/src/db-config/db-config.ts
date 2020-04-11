import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./routes/api";
const DEFAULT_PORT = 4000;

const app = express();
app.use(bodyParser.json());
//security
app.use(cors());
app.use('/api', router);

// mongoose connection to db
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/mandzhichka', mongoOptions);
mongoose.Promise = global.Promise;

app.listen(process.env.port || DEFAULT_PORT, () => { console.log('Listening for requests!'); });
