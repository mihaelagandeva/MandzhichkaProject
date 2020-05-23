import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    authorId: { type: String },
    text: { type: String },
    date: { type: Date }
});

interface IComment extends mongoose.Document {
    authorId: string;
    text: string;
    date: Date;
}

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;