import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";
import * as Product from "./product";
import { IProduct } from "./product";

const ShoppingListSchema = new mongoose.Schema({
    user: User.UserSchema,
    entities: [{
        product: Product.ProductSchema,
        quantity: { type: Number },
        metric: { type: String}
    }]
});

interface IShoppingList extends mongoose.Document {
    user: IUser;
    entities: {
        product: IProduct;
        quantity: number;
        metric: string;
    }[];
} 

const ShoppingList = mongoose.model<IShoppingList>("ShoppingList", ShoppingListSchema);
export default ShoppingList;