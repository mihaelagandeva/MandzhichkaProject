import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    recipeId: { type: String },
    userId: { type: String },
    value: { type: Number, min: 0, max: 5 }
});

interface IRating extends mongoose.Document {
    recipeId: string;
    userId: string;
    value: number;
}

const Rating = mongoose.model<IRating>("Rating", RatingSchema);
export default Ratingl;