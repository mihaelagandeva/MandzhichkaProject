import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    achievements: [{
        achievementId: { type: Number }
    }]
});
export const User = mongoose.model("user", userSchema);