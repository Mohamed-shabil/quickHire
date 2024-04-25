import {
    NotAutherizedError,
    NotFoundError,
    catchAsync,
    isRecruiter,
    requireAuth,
} from "@quickhire/common";
import express, { Request, Response } from "express";
import { Subscribers } from "../model/subscribersModel";
import { Subscription } from "../model/SubscriptionModel";
import { User } from "../model/UserModel";

const router = express.Router();

router.get(
    "/api/payments/subscription/current-subscription",
    catchAsync(async (req: Request, res: Response) => {
        const currentUser = req.currentUser;
        if (!currentUser) {
            throw new NotAutherizedError();
        }
        const user = await User.findById({ _id: currentUser._id });

        const subscriber = await Subscribers.findById({
            _id: user?.subscription,
        });

        console.log("CURRENT SUBSCRIPTION", subscriber);

        if (!subscriber) {
            throw new NotFoundError("No Subscribtion found for the user ID");
        }

        const subscription = await Subscription.findById({
            _id: subscriber.subscription,
        });
        console.log("Subscriptiosns ----", subscription);
        res.status(200).json({
            status: "success",
            subscription,
        });
    })
);

export { router as currentSubscriptionRoute };
