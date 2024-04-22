import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotAutherizedError,
    requireAuth,
} from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { Profile } from "../model/profile";
import { ImageConverter, uploadProfie } from "../middleware/profileUpload";
import { KafkaProducer } from "@quickhire/common";
import { kafkaClient } from "../events/kafkaClient";
import { Follow } from "../model/follow";

const router = express.Router();

router.patch(
    "/api/profile/avatar",
    requireAuth,
    ImageConverter,
    uploadProfie,
    catchAsync(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new BadRequestError("No File is uploaded");
        }
        const fileWithLocation = req.file as Express.MulterS3.File;
        const fileLocation = fileWithLocation.location;
        console.log(fileWithLocation);

        const profile = await Profile.findOne({ _id: req.currentUser?._id });

        if (!profile) {
            throw new NotAutherizedError();
        }

        const followers = Follow.find({ follow: req.currentUser?._id });
        const followings = Follow.find({ followedBy: req.currentUser?._id });

        profile.avatar = fileLocation;
        await profile.save();

        const payload = {
            _id: profile._id,
            fullname: profile.fullName,

            name: profile.username,
            avatar: profile.avatar,
            headline: profile.headline,
        };
        const response = new KafkaProducer(kafkaClient).produce(
            "avatar-updated",
            payload
        );
        console.log({ response }, { payload });

        return res.status(200).json({
            status: "Success",
            profile,
        });
    })
);

export { router as avatarRouter };
