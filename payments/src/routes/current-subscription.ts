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

const router = express.Router();

router.get(
    "/api/payments/subscriptions/current-subscription",
    catchAsync(async (req: Request, res: Response) => {
        const currentUser = req.currentUser;
        if (!currentUser) {
            throw new NotAutherizedError();
        }

        const subscriber = await Subscribers.findOne({
            userId: currentUser._id,
        });

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
