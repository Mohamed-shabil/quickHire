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
    "/api/payments/subscription/new",
    requireAuth,
    isAdmin,
    [
        body("planName").notEmpty().withMessage("Plan Name can't be empty"),
        body("postLimit").notEmpty().withMessage("Post Limit can't be empty"),
        body("price").notEmpty().withMessage("Price can't be empty"),
        body("description")
            .notEmpty()
            .withMessage("Subscription description can't be empty"),
        body("billingPeriod")
            .notEmpty()
            .withMessage("billing Period can't be empty"),
        validateRequest,
    ],
    catchAsync(async (req: Request, res: Response) => {
        const { planName, postLimit, price, billingPeriod, description } =
            req.body;
        const newPlan = new Subscription({
            planName,
            postLimit,
            billingPeriod,
            price,
            description,
        });

        await newPlan.save();

        await new KafkaProducer(kafkaClient).produce(
            "subscription-created",
            newPlan
        );

        res.status(201).json({
            status: "success",
            subscription: newPlan,
        });
    })
);

export { router as createSubscriptionRoute };
