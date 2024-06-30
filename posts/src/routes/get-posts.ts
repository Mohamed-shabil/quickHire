import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotAutherizedError,
    currentUser,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { Posts } from "../model/postModel";
import mongoose from "mongoose";
const router = express.Router();

router.get(
    "/api/posts/show",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const currentUser = req.currentUser?._id;
        let page = Number(req.params.page);
        const pageSize = 10;
        if (!page) {
            page = 1;
        }
        const posts = await Posts.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creator",
                },
            },
            {
                $lookup: {
                    from: "follows",
                    let: { creatorId: "$creatorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$follow", "$$creatorId"] },
                                        {
                                            $eq: [
                                                "$followedBy",
                                                new mongoose.Types.ObjectId(
                                                    currentUser
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "currentUserFollowingCreator",
                },
            },
            {
                $addFields: {
                    isLikedByCurrentUser: {
                        $in: [
                            new mongoose.Types.ObjectId(currentUser),
                            "$likes.user",
                        ],
                    },
                    isFollowing: {
                        $ne: [{ $size: "$currentUserFollowingCreator" }, 0],
                    },
                    totalLikes: { $size: "$likes" },
                },
            },
            {
                $project: {
                    likes: 0,
                    followers: 0,
                    currentUserFollowingCreator: 0,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        console.log(posts);

        return res.status(200).json({
            status: "Success",
            post: posts,
        });
    })
);

export { router as getAllPosts };
