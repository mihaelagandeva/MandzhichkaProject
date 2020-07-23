import mongoose from "mongoose";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/mandzhichka', mongoOptions);
mongoose.Promise = global.Promise;