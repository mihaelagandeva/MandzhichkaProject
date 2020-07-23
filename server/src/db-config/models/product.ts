import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [30, 'Името на продукта трябва да е най-много 30 символа'],
        minlength: [2, 'Името на продукта трябва да е най-малко 2 символа'],
        required: [true, 'Името на продукта е задължително'],
    },
    type: {
        type: String,
        maxlength: [30, 'Типа на продукта трябва да е най-много 30 символа'],
        minlength: [2, 'Типа на продукта трябва да е най-малко 2 символа'],
        required: [true, 'Типа на продукта е задъжителен'],
    }
});

interface IProduct extends mongoose.Document {
    name: string;
    type: string;
}

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;