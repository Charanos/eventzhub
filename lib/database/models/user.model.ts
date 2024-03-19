import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    lastName: { type: String },
    photo: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserSchema);

export default User;
