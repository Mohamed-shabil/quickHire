import { catchAsync, isAdmin, requireAuth } from "@quickhire/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Subscription } from "../model/SubscriptionModel";

const router = express.Router();

router.get(
    "/api/payments/subscription",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const subscription = await Subscription.find({
            planName: { $ne: "free" },
        });
        console.log(subscription);
        res.status(200).json({
            status: "success",
            subscriptions: subscription,
        });
    })
);

export { router as subscriptionsRoute };
