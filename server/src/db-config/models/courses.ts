import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
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

interface ICourse extends mongoose.Document {
    name: string;
    date: Date;
    address: string;
    picturePath: string;
    duration: {
        quantity: number;
        metric: string
    }
    participants: {
        userId: string
    }[]
}

const Course = mongoose.model<ICourse>("Course", CourseSchema);
export default Course;