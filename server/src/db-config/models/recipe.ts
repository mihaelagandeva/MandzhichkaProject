import mongoose from "mongoose";
import { IProduct } from "./product";
import { ITag } from "./tag";
import * as Tag from './tag';

export const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
    },
    author: { type: String },
    summary: { type: String },
    date: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    picturePath: { type: String },
    products: [{
        name: { type: String },
        quantity: { type: Number },
        metrics: { type: String }
    }],
    tags: [Tag.TagSchema],
    prepTime: { type: Number },
    steps: [{ type: String }]
});

export interface IRecipe extends mongoose.Document {
    name: string;
    author: string;
    date: Date;
    rating: number;
    picturePath: string;
    products: IProduct[];
    tags: ITag['_id'];
    prepTime: Number;
    steps: string[];
}

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;