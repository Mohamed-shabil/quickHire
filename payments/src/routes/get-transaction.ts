import { catchAsync, isAdmin, requireAuth } from "@quickhire/common";
import express, { Request, Response } from "express";
import { Subscribers } from "../model/subscribersModel";
import { populate } from "dotenv";

const router = express.Router();

router.get(
    "/api/payments/transactions",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const transactions = await Subscribers.find({
            stripeId: { $ne: "00000" },
        })
            .populate(["userId", "subscription"])
            .sort("-1");

        console.log(transactions);
        res.status(200).json({
            status: "success",
            transactions,
        });
    })
);

export { router as transationsRoute };
