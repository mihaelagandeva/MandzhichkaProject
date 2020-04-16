import mongoose from "mongoose";

const Schema = mongoose.Schema;
const tagSchema = new Schema({
    id: { type: Number },
    value: { type: String }
});
export const Tag = mongoose.model("tag", tagSchema);