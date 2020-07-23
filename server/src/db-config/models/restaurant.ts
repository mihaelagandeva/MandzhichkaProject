import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Името на ресторанта е задължително'],
        minlength: [3, 'Името на ресторанта трябва да е дълго поне 3 символа'],
        maxlength: [100, 'Името на ресторанта е твърде дълго']
    },
    address: {
        type: String,
        required: [true, 'Адресът на ресторанта е задължителен'],
        minlength: [10, 'Адресът на ресторанта е твърде къс'],
        maxlength: [150, 'Адресът на ресторанта е твърде дълъг']
    },
    picturePath: { type: String },
    phone: {
        type: String,
        required: [true, 'Телефонът на ресторанта е задължителен'],
        minlength: [10, 'Телефонният номер трябва да е дълъг поне 10 символа'],
        maxlength: [13, 'Телефонният номер трябва да е дълъг най-много 13 символа'],
        validate: [/^\+359[0-9]{9}$|^0[0-9]{9}$/g, 'Телефонният номер е невалиден']
    }
});

interface IRestaurant extends mongoose.Document {
    name: string;
    address: string;
    picturePath: string;
    phone: string;
}

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
export default Restaurant;