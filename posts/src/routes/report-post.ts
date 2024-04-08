import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotAutherizedError,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { body } from "express-validator";
import { Posts } from "../model/postModel";
const router = express.Router();

router.patch(
    "/api/posts/:postId/report",
    requireAuth,
    [
        body("reason").notEmpty().withMessage("Reasons can't be empty"),
        validateRequest,
    ],
    catchAsync(async (req: Request, res: Response) => {
        const { postId } = req.params;
        const { reason } = req.body;
        console.log(reason);
        const currentUser = req.currentUser;

        if (!currentUser) {
            throw new NotAutherizedError();
        }

        const report = {
            userId: currentUser._id,
            reason: reason,
        };

        const post = await Posts.findById({ _id: postId });
        if (!post) {
            throw new BadRequestError("No post with this user id");
        }

        post.report.push(report);
        await post.save();
        res.status(200).json({
            status: "success",
            post,
        });
    })
);

export { router as reportRoute };
