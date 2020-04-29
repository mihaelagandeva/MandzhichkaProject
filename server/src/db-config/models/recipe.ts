import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: { type: String },
    author: { type: String },
    date: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    picturePath: { type: String },
    tags: [{
        tagId: { type: Number }
    }]
});

interface IRecipe extends mongoose.Document {
    name: string;
    author: string;
    date: Date;
    rating: number;
    picturePath: string;
    tags: {
        tagId: string;
    }[]
}

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;