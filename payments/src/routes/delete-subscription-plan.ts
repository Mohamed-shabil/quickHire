import {
    KafkaProducer,
    catchAsync,
    isAdmin,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Subscription } from "../model/SubscriptionModel";
import { kafkaClient } from "../events/kafkaClient";

const router = express.Router();

router.delete(
    "/api/payments/subscription/remove/:subscriptionId",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const { subscriptionId } = req.params;

        const subscription = await Subscription.findByIdAndDelete({
            _id: subscriptionId,
        });
        console.log(subscription);
        await new KafkaProducer(kafkaClient).produce(
            "subscription-deleted",
            subscriptionId
        );
        res.status(200).json({
            status: "success",
            subscription: {},
        });
    })
);

export { router as deleteSubscriptionRoute };
