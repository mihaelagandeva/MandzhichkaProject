import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: { type: Number },
    username: { type: String },
    password: { type: String },
    achievements: [{
        achievementId: { type: Number }
    }]
});
export const User = mongoose.model("user", userSchema);