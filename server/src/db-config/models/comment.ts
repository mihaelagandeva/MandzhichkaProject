import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema({
    authorId: { type: Number },
    text: { type: String },
    date: { type: Date }
});
export const Comment = mongoose.model("comment", commentSchema);