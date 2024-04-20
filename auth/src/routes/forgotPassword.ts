import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NotFoundError, validateRequest } from "@quickhire/common";
import { User } from "../model/user";
import crypto from "crypto";
import { forgotPasswordEmail } from "../templates/forgotPassword";
import nodemailer from "nodemailer";
import catchAsync from "../utils/catchAsync";

const router = express.Router();

router.post(
    "/api/users/forgotPassword",
    [
        body("email")
            .isEmail()
            .withMessage("Email ID is not valid or not provided"),
        validateRequest,
    ],
    catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFoundError("user not found with this email");
        }
        const token = await crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        await user.save();

        const resetLink = `${process.env.CLIENT_URI}/resetPassword/${token}`;
        const options = {
            from: process.env.EMAIL,
            to: email,
            subject: "QuickHire Password Reset",
            html: forgotPasswordEmail.replace("$$$$", resetLink),
        };
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log("Error:", error);
            } else {
                console.log("Email Sent :", info.response);
                res.send("success");
            }
        });
        return res.status(200).json({
            status: "success",
            message: "Token send to mail",
        });
    })
);

export { router as forgotPasswordRouter };
