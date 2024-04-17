import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotAutherizedError,
    isAdmin,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { Posts } from "../model/postModel";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.delete(
    "/api/posts/delete/:id/admin",
    catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const post = await Posts.findOneAndDelete({
            _id: id,
        });
        console.log(Posts);
        console.log(post);
        return res.status(200).json({
            status: "Success",
            post: null,
        });
    })
);

export { router as deletepostAdmin };
