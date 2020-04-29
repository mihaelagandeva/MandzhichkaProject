import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    picturePath: { type: String }
});

interface IShop extends mongoose.Document {
    name: string;
    address: string;
    picturePath: string;
}

const Shop = mongoose.model<IShop>("Shop", ShopSchema);
export default Shop;