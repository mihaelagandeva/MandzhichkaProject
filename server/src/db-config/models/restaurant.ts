import mongoose from "mongoose";

const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
    name: { type: String },
    address: { type: String },
    picturePath: { type: String },
    phone: { type: String }
});
export const Restaurant = mongoose.model("restaurant", restaurantSchema);