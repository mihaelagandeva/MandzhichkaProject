import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";

const CommentSchema = new mongoose.Schema({
    author: User.UserSchema,
    recipeId: {type: String},
    text: { type: String },
    date: { type: Date }
});

interface IComment extends mongoose.Document {
    author: IUser;
    recipeId: string, 
    text: string;
    date: Date;
}

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;