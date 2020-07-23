import mongoose from "mongoose";
import { ITag } from "./tag";
import * as Tag from './tag';

export const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
    },
    author: { type: String },
    date: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    picturePath: { type: String },
    tags: [Tag.TagSchema]
});

export interface IRecipe extends mongoose.Document {
    name: string;
    author: string;
    date: Date;
    rating: number;
    picturePath: string;
    tags: ITag['_id'];
}

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;