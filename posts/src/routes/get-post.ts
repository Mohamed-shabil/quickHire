import express, { Request, Response } from "express";
import { BadRequestError, requireAuth } from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { Posts } from "../model/postModel";
import mongoose from "mongoose";
const router = express.Router();

router.get(
    "/api/posts/get-one/:id",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        console.log("reach8ing here ");
        const id = req.params.id;

        const post = await Posts.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) },
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
                $project: {
                    _id: 1,
                    creator: {
                        _id: "$creator._id",
                        name: "$creator.name",
                        fullName: "$creator.fullName",
                        email: "$creator.email",
                        avatar: "$creator.avatar",
                        headline: "$creator.headline",
                    },
                    creatorId: 1,
                    caption: 1,
                    media: 1,
                    liked: 1,
                    followingCreator: 1,
                    comments: 1,
                    isLikedByCurrentUser: 1,
                    isFollowing: 1,
                    totalLikes: 1,
                    report: 1,
                    createdAt: 1,
                },
            },
        ]);

        console.log("posther ====", post[0]);

        if (!post) {
            throw new BadRequestError("No post with this ID found");
        }
        return res.status(200).json({
            status: "Success",
            post: post[0],
        });
    })
);

export { router as getOnePost };
