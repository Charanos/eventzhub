import { Schema, model, models } from "mongoose";

// interface IUser extends Document {
//     photo: string;
//     email: string;
//     clerkId: string;
//     lastName: string;
//     username: string;
//     firstName: string;
// }

const UserSchema = new Schema({
    photo: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserSchema);

export default User;
