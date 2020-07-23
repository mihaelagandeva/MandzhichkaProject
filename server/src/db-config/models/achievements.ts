import mongoose from "mongoose";

export const AchievementSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String }
});

export interface IAchievement extends mongoose.Document {
    name: string;
    description: string;
}

export const Achievement = mongoose.model<IAchievement>("achievement", AchievementSchema);
export default Achievement;