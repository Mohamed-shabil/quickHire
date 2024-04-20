import { catchAsync, requireAuth } from "@quickhire/common";
import express from "express";
const router = express.Router();

router.get(
    "/api/auth/users/signout",
    catchAsync(async (req, res) => {
        res.status(200).clearCookie("jwt").json({
            status: "success",
            user: {},
        });
    })
);
export { router as logoutRouter };
