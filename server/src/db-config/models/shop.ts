import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Името на магазина е задължително'],
        minlength: [3, 'Името на магазина трябва да е дълго поне 3 символа'],
        maxlength: [100, 'Името на магазина е твърде дълго']
    },
    address: {
        type: String,
        required: [true, 'Адресът на магазина е задължителен'],
        minlength: [10, 'Адресът на магазина е твърде къс'],
        maxlength: [150, 'Адресът на магазина е твърде дълъг']
    },
    picturePath: { type: String }
});

interface IShop extends mongoose.Document {
    name: string;
    address: string;
    picturePath: string;
}

const Shop = mongoose.model<IShop>("Shop", ShopSchema);
export default Shop;