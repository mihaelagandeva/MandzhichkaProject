import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Името на събитието е задължително'],
        minlength: [3, 'Името на събитието трябва да е дълго поне 3 символа'],
        maxlength: [100, 'Името на събитието е твърде дълго']
    },
    date: {
        type: Date,
        required: [true, 'Датата на събитието е задължителна']
    },
    address: {
        type: String,
        required: [true, 'Адресът на събитието е задължителен'],
        minlength: [10, 'Адресът на събитието е твърде къс'],
        maxlength: [150, 'Адресът на събитието е твърде дълъг']
    },
    picturePath: { type: String },
    duration: {
        quantity: { type: Number },
        metric: { type: String }
    },
    participants: {type: Array}
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
    participants: string[]
}

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;