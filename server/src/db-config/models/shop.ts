import mongoose from "mongoose";

const Schema = mongoose.Schema;
const shopSchema = new Schema({
    name: { type: String },
    address: { type: String },
    picturePath: { type: String }
});
export const Shop = mongoose.model("shop", shopSchema);