import express, { Request, Response } from "express";
import {
    catchAsync,
    requireAuth,
    BadRequestError,
    NotAutherizedError,
} from "@quickhire/common";
import { User } from "../model/UsersModel";
import { Resume } from "../model/ResumeModel";

const router = express.Router();

router.get(
    "/api/jobs/applicant-info",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const currentUser = req.currentUser;

        console.log("APPLICANT_INFO");
        if (!currentUser) {
            throw new NotAutherizedError();
        }

        const user = await User.findOne({
            where: {
                _id: currentUser._id,
            },
            include: [
                {
                    model: Resume,
                    as: "resume",
                },
            ],
        });

        console.log("applicant-info", user);

        if (!user) {
            throw new BadRequestError("No User with this User-ID");
        }
        console.log("hello wolrd");

        res.status(200).json({
            status: "success",
            user,
        });
    })
);

export { router as applicantInfoRouter };
