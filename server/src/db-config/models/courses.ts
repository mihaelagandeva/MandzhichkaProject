import mongoose from "mongoose";

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    id: { type: Number },
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
export const Course = mongoose.model("course", courseSchema);