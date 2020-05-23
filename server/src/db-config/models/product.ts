import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String }
});

interface IProduct extends mongoose.Document {
    name: string;
    type: string;
}

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;