import { catchAsync, isAdmin, requireAuth } from "@quickhire/common";
import express, { Request, Response } from "express";
import { Posts } from "../model/postModel";

const router = express.Router();

router.get(
    "/api/posts/report",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const posts = await Posts.find({
            report: { $exists: true, $not: { $size: 0 } },
        }).populate("creatorId");

        console.log(posts);

        res.status(200).json({
            status: "success",
            posts,
        });
    })
);

export { router as reportedPostsRoute };
