import express, { Response, Request } from "express";
import {
    BadRequestError,
    NotAutherizedError,
    currentUser,
    requireAuth,
} from "@quickhire/common";
import { Profile } from "../model/profile";
import catchAsync from "../utils/catchAsync";
import { Follow } from "../model/follow";
const router = express.Router();

router.get(
    "/api/profile/current-user",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        console.log("CURRENT USER");
        if (!req.currentUser) {
            throw new NotAutherizedError();
        }
        const user = await Profile.findOne({ _id: req.currentUser._id });
        if (!user) {
            throw new BadRequestError("User with this ID does not exist");
        }

        const followers = await Follow.find({ follow: req.currentUser._id });
        const followings = await Follow.find({
            followedBy: req.currentUser._id,
        });

        const currentUser = {
            ...req.currentUser,
            avatar: user.avatar,
            headline: user.headline,
            followers,
            followings,
        };

        return res.status(200).json({
            status: "success",
            currentUser,
        });
    })
);
export { router as currentUserRouter };
