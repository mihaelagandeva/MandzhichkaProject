import mongoose from "mongoose";

const ShoppingListSchema = new mongoose.Schema({
    userId: { type: String },
    entities: [{
        product: { type: String },
        quantity: { type: Number },
        metric: { type: String}
    }]
});

interface IShoppingList extends mongoose.Document {
    userId: string;
    entities: {
        product: string;
        quantity: number;
        metric: string;
    }[];
} 

const ShoppingList = mongoose.model<IShoppingList>("ShoppingList", ShoppingListSchema);
export default ShoppingList;