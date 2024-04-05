import mongoose, { InferSchemaType, Schema } from "mongoose";
const paymentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    stripeId: {
        type: String,
    },
    subscription: {
        types: mongoose.Types.ObjectId,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

type Subscribers = InferSchemaType<typeof paymentSchema>;

const SubscribersModel = mongoose.model("Subscribers", paymentSchema);

export { SubscribersModel as Subscribers };
