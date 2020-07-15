import mongoose from "mongoose";
import { ITag } from "./tag";
import * as Tag from './tag';

const RecipeSchema = new mongoose.Schema({
    name: { type: String },
    author: { type: String },
    date: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    picturePath: { type: String },
    tags: [Tag.TagSchema]
});

interface IRecipe extends mongoose.Document {
    name: string;
    author: string;
    date: Date;
    rating: number;
    picturePath: string;
    tags: ITag['_id'];
}

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;