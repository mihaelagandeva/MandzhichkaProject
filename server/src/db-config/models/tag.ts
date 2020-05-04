import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    value: { type: String }
});

interface ITag extends mongoose.Document {
    value: string;
}

const Tag = mongoose.model<ITag>("Tag", TagSchema);
export default Tag;