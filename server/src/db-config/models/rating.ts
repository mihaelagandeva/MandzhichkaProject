import mongoose from "mongoose";
import * as User from "./user";
import { IUser } from "./user";
import * as Recipe from "./recipe";
import { IRecipe } from "./recipe";

const RatingSchema = new mongoose.Schema({
    recipe: Recipe.RecipeSchema,
    user: User.UserSchema,
    value: { type: Number, min: 0, max: 5 }
});

interface IRating extends mongoose.Document {
    recipe: IRecipe;
    user: IUser;
    value: number;
}

const Rating = mongoose.model<IRating>("Rating", RatingSchema);
export default Ratingl;