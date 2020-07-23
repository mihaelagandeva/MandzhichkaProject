import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";

const EventSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: Date },
    address: { type: String },
    picturePath: { type: String },
    duration: {
        quantity: { type: Number },
        metric: { type: String }
    },
    participants: [User.UserSchema]
});

interface IEvent extends mongoose.Document {
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

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;