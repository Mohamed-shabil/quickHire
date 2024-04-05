import mongoose, { InferSchemaType, Schema } from "mongoose";
const subscriberSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        stripeId: {
            type: String,
        },
        subscription: {
            type: mongoose.Types.ObjectId,
            ref: "Subscription",
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

type Subscribers = InferSchemaType<typeof subscriberSchema>;

const SubscribersModel = mongoose.model("Subscriber", subscriberSchema);

export { SubscribersModel as Subscribers };
