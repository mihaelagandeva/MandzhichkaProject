import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    recipeId: { type: Number },
    userId: { type: Number },
    value: { type: Number, min: 0, max: 5 }
});
export const Rating = mongoose.model("rating", ratingSchema);