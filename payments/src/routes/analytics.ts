import { catchAsync } from "@quickhire/common";
import express, { Request, Response } from "express";
import { Subscribers } from "../model/subscribersModel";
import { User } from "../model/UserModel";

const router = express.Router();

router.get(
    "/api/payments/analytics",
    catchAsync(async (req: Request, res: Response) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const lifeTimeRevenue = await Subscribers.aggregate([
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "subscription",
                    foreignField: "_id",
                    as: "subscriptionDetails",
                },
            },
            {
                $unwind: "$subscriptionDetails",
            },
            {
                $group: {
                    _id: null,
                    totalLifetimeRevenue: {
                        $sum: "$subscriptionDetails.price",
                    },
                },
            },
        ]);

        const currentDate = new Date();
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const monthlyRevenue = await Subscribers.aggregate([
            {
                $match: {
                    startDate: { $gte: firstDayOfMonth },
                },
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "subscription",
                    foreignField: "_id",
                    as: "subscriptionDetails",
                },
            },
            {
                $unwind: "$subscriptionDetails",
            },
            {
                $group: {
                    _id: null,
                    monthlyRevenue: { $sum: "$subscriptionDetails.price" },
                },
            },
        ]);

        const usersCount = await User.aggregate([
            {
                $match: {
                    role: { $in: ["seeker", "recruiter"] },
                },
            },
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    roles: {
                        $push: {
                            k: "$_id",
                            v: "$count",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    seekers: {
                        $let: {
                            vars: {
                                seeker: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$roles",
                                                as: "role",
                                                cond: {
                                                    $eq: ["$$role.k", "seeker"],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                            in: { $ifNull: ["$$seeker.v", 0] },
                        },
                    },
                    recruiters: {
                        $let: {
                            vars: {
                                recruiter: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$roles",
                                                as: "role",
                                                cond: {
                                                    $eq: [
                                                        "$$role.k",
                                                        "recruiter",
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                            in: { $ifNull: ["$$recruiter.v", 0] },
                        },
                    },
                },
            },
        ]);
        console.log(usersCount, lifeTimeRevenue, monthlyRevenue);

        res.status(200).json({
            status: "success",
            analytics: {
                lifeTimeRevenue:
                    lifeTimeRevenue[0]?.totalLifetimeRevenue || "0",
                monthlyRevenue: monthlyRevenue[0]?.monthlyRevenue || "0",
                users: usersCount[0],
            },
        });
    })
);

export { router as analyticsDataRoute };
