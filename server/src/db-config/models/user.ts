import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    achievements: [{
        achievementId: { type: Number }
    }]
});

interface IUser extends mongoose.Document {
    username: string;
    password: string;
    achievements: number[];
}

UserSchema.pre<IUser>('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err: Error, hash: string) {
        if (err) {
            throw err;
        }
        user.password = hash;
        next();
    })
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;