import mongoose from "mongoose";

const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String },
    type: { type: String }
});
export const Product = mongoose.model("product", productSchema);