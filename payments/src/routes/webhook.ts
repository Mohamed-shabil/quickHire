import { NotFoundError, catchAsync } from "@quickhire/common";
import { stripe } from "../utils/stripe";
import express, { Request, Response } from "express";
import { Subscribers } from "../model/subscribersModel";
import mongoose from "mongoose";
import Stripe from "stripe";
import { User } from "../model/UserModel";

let endpointSecret: string;

endpointSecret = process.env.END_POINT_SECRET!;

const router = express.Router();

router.post(
    "/api/payments/webhook",
    express.raw({ type: "application/json" }),
    catchAsync(async (req: Request, res: Response) => {
        const sig = req.headers["stripe-signature"];
        let data;
        let eventType;
        if (endpointSecret) {
            let event;
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    // @ts-ignore
                    sig,
                    endpointSecret
                );
            } catch (err: any) {
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }

            data = event.data.object as Stripe.Event;
            eventType = event.type;
        } else {
            console.log("in side else");

            data = req.body.object;
            eventType = req.body.type;
        }
        if (eventType === "checkout.session.completed") {
            const customer = (await stripe.customers.retrieve(
                data.customer
            )) as Stripe.Response<Stripe.Customer>;

            const user = await User.findOne({ _id: customer.metadata.userId });

            if (!user) {
                return res.status(400).json({
                    status: "fail",
                    message: "User is not found",
                });
            }

            if (data.payment_status !== "paid") {
                return res.status(400).json({
                    status: "fail",
                    message: "payment is not successfull",
                    payment: data,
                });
            }
            const subscriber = new Subscribers({
                stripeId: data.id,
                subscription: data.metadata.subscription,
                userId: data.metadata.userId,
                endDate: new Date(data.metadata.subscriptionTenure),
                startDate: new Date(),
            });
            user.subscription = subscriber._id;
            await user.save();
            await subscriber.save();
        }
        res.send().end();
    })
);

export { router as stripeWebhookRoute };
