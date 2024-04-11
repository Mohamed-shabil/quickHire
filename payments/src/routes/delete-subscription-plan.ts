import {
    catchAsync,
    isAdmin,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Subscription } from "../model/SubscriptionModel";

const router = express.Router();

router.post(
    "/api/payments/subscription/remove/:subscriptionId",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const { subscriptionId } = req.params;

        const subscription = Subscription.findByIdAndDelete({
            _id: subscriptionId,
        });
        res.status(200).json({
            status: "success",
            subscription: {},
        });
    })
);

export { router as deleteSubscriptionRoute };
