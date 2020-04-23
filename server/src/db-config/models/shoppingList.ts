import mongoose from "mongoose";

const Schema = mongoose.Schema;
const shoppingListSchema = new Schema({
    userId: { type: Number },
    entites: [{
        product: { type: String },
        quantity: { type: Number },
        metric: { type: String}
    }]
});
export const ShoppingList = mongoose.model("shoppingList", shoppingListSchema);