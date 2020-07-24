import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Името на курса е задължително'],
        minlength: [3, 'Името на курса трябва да е дълго поне 3 символа'],
        maxlength: [100, 'Името на курса е твърде дълго']
    },
    date: {
        type: Date,
        required: [true, 'Датата на курса е задължителна']
    },
    address: {
        type: String,
        required: [true, 'Адресът на курса е задължителен'],
        minlength: [10, 'Адресът на курса е твърде къс'],
        maxlength: [150, 'Адресът на курса е твърде дълъг']
    },
    picturePath: { type: String },
    duration: {
        quantity: { type: Number },
        metric: { type: String }
    },
    participants: [User.UserSchema]
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
    participants: IUser[];
}

const Course = mongoose.model<ICourse>("Course", CourseSchema);
export default Course;