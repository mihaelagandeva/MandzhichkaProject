import mongoose from "mongoose";

const Schema = mongoose.Schema;
const recipesSchema = new Schema({ name: { type: String } });
export const Recipe = mongoose.model("recipes", recipesSchema);