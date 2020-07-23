import mongoose from "mongoose";

export const TagSchema = new mongoose.Schema({
    value: { type: String }
});

export interface ITag extends mongoose.Document {
    value: string;
}

const Tag = mongoose.model<ITag>("Tag", TagSchema);
export default Tag;