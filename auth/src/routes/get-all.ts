import { catchAsync } from "@quickhire/common";
import expres, { Request, Response } from "express";
import { User } from "../model/user";

const router = expres.Router();

router.get(
    "/api/users/get-all",
    catchAsync(async (req: Request, res: Response) => {
        const { role } = req.params;
        const users = await User.find({ role: { $ne: "admin" } }).select(
            "-phone -password -resetPasswordToken -resetPasswordExpires"
        );
        res.status(200).json({
            status: "success",
            users,
        });
    })
);

export { router as getAllUsersRoute };
