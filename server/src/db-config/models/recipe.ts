import mongoose from "mongoose";
import { User } from "./user";

const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: { type: String },
    author: { type: User },
    summary: { type: String },
    date: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    picturePath: { type: String },
    tags: [{
        tagId: { type: Number }
    }]
});
export const Recipe = mongoose.model("recipe", recipeSchema);