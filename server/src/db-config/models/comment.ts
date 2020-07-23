import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";

const CommentSchema = new mongoose.Schema({
    author: User.UserSchema,
    text: { type: String },
    date: { type: Date }
});

interface IComment extends mongoose.Document {
    authorId: IUser;
    text: string;
    date: Date;
}

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;