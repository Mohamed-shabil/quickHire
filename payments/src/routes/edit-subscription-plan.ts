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

router.post(
    "/api/payments/subscription/edit/:subscriptionId",
    requireAuth,
    isAdmin,
    [
        body("planName").notEmpty().withMessage("Plan Name can't be empty"),
        body("postLimit").notEmpty().withMessage("Post Limit can't be empty"),
        body("description")
            .notEmpty()
            .withMessage("Subscription description can't be empty"),
        body("price").notEmpty().withMessage("Price can't be empty"),
        body("billingPeriod")
            .notEmpty()
            .withMessage("billing Period can't be empty"),
        validateRequest,
    ],
    catchAsync(async (req: Request, res: Response) => {
        const { planName, postLimit, price, billingPeriod, description } =
            req.body;
        const { subscriptionId } = req.params;

        const subscription = await Subscription.findByIdAndUpdate(
            { _id: subscriptionId },
            { planName, postLimit, price, billingPeriod, description },
            { new: true }
        );

        await new KafkaProducer(kafkaClient).produce(
            "subscription-updated",
            subscriptionId
        );

        res.status(200).json({
            status: "success",
            subscription: subscription,
        });
    })
);

export { router as editSubscriptionRoute };
