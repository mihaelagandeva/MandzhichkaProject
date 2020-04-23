import mongoose from "mongoose";

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: { type: String },
    date: { type: Date },
    address: { type: String },
    picturePath: { type: String },
    duration: {
        quantity: { type: Number },
        metric: { type: String }
    },
    participants: [{
        userId: { type: Number }
    }]
});
export const Event = mongoose.model("event", eventSchema);