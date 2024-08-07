import express, { Response, Request } from "express";
import {
    NotAutherizedError,
    catchAsync,
    currentUser,
    requireAuth,
} from "@quickhire/common";
import { User } from "../model/user";

const router = express.Router();

router.get(
    "/api/auth/users/current-user",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const user = req.currentUser;
        console.log("user is still here ", user);
        if (!user) {
            throw new NotAutherizedError();
        }
        const currentUser = await User.findById({ _id: user._id }).select(
            "-password"
        );

        if (!currentUser) {
            throw new NotAutherizedError();
        }

        res.status(200).json({
            status: "success",
            currentUser,
        });
    })
);
export { router as currentUserRouter };
