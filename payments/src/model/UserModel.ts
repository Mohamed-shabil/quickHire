import mongoose, { Schema, InferSchemaType, Mongoose } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    fullName: {
        type: String,
    },
    headLine: {
        type: String,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "seeker", "recruiter"],
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subscribers",
    },
    stripeUserId: {
        type: String,
    },
});

type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model<UserType>("User", userSchema);

export { User, UserType };
