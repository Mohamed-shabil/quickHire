import express, { Request, Response } from "express";
import { requireAuth, catchAsync, isAdmin } from "@quickhire/common";
import { User } from "../model/user";
const router = express.Router();

router.patch(
    "/api/auth/users/block/:userId",
    requireAuth,
    isAdmin,
    catchAsync(async (req: Request, res: Response) => {
        const { userId } = req.params;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { isBlocked: true },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            user,
        });
    })
);

export { router as blockUserRoute };
