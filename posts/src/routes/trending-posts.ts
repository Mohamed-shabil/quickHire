import express, { Request, Response } from "express";
import { Posts } from "../model/postModel";
import {
    requireAuth,
    isAdmin,
    NotAutherizedError,
    catchAsync,
} from "@quickhire/common";
import { Likes } from "../model/likesModel";
const router = express.Router();

router.get(
    "/api/posts/trending-posts",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const currentUser = req.currentUser;
        if (!currentUser) {
            throw new NotAutherizedError();
        }

        const trendingPosts = await Likes.aggregate([
            {
                $group: {
                    _id: "$post",
                    likes: { $sum: 1 },
                },
            },
            {
                $sort: { likesCount: -1 },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "_id",
                    as: "postDetails",
                },
            },
            {
                $unwind: "$postDetails",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postDetails.creatorId",
                    foreignField: "_id",
                    as: "creatorDetails",
                },
            },
            {
                $unwind: "$creatorDetails",
            },
            {
                $project: {
                    _id: "$postDetails._id",
                    creator: {
                        name: "$creatorDetails.name",
                        fullName: "$creatorDetails.fullName",
                        email: "$creatorDetails.email",
                        avatar: "$creatorDetails.avatar",
                        headline: "$creatorDetails.headLine",
                    },
                    caption: "$postDetails.caption",
                    media: "$postDetails.media",
                    report: "$postDetails.report",
                    createdAt: "$postDetails.createdAt",
                    likes: 1,
                },
            },
        ]);

        console.log(trendingPosts);

        res.status(200).json({
            status: "success",
            posts: trendingPosts,
        });
    })
);

export { router as trendingPostRoute };
