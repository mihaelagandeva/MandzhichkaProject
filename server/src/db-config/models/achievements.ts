import mongoose from "mongoose";

const Schema = mongoose.Schema;
const achievementsSchema = new Schema({
    name: { type: String },
    description: { type: String }
});
export const Achievement = mongoose.model("achievements", achievementsSchema);