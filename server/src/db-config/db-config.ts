import mongoose from "mongoose";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/mandzhichka', mongoOptions);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;