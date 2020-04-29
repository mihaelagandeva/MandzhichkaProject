import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String }
});

interface IAchievement extends mongoose.Document {
    name: string;
    description: string;
}

export const Achievement = mongoose.model<IAchievement>("achievement", AchievementSchema);
export default Achievement;