import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    picturePath: { type: String },
    phone: { type: String }
});

interface IRestaurant extends mongoose.Document {
    name: string;
    address: string;
    picturePath: string;
    phone: string;
}

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
export default Restaurant;