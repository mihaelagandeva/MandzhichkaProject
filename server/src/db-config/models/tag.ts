import mongoose from "mongoose";

const Schema = mongoose.Schema;
const tagSchema = new Schema({
    value: { type: String }
});
export const Tag = mongoose.model("tag", tagSchema);