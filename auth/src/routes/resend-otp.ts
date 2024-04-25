import express, { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { body, validationResult } from "express-validator";
import {
    BadRequestError,
    requireAuth,
    validateRequest,
} from "@quickhire/common";
import OtpVerification from "../model/otp";
import randomString from "randomstring";
import bcrypt from "bcryptjs";
import { User } from "../model/user";
import { otpMail } from "../templates/otpEmail";
import nodemailer from "nodemailer";
const router = express.Router();

router.post(
    "/api/auth/users/send-otp",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        console.log(req.currentUser);
        const UserOtp = await OtpVerification.findOne({
            owner: req.currentUser!._id,
        });
        if (!UserOtp) {
            throw new BadRequestError("No user with this user ID");
        }

        const newOtp = randomString.generate({
            length: 4,
            charset: "numeric",
        });

        const hashedOtp = await bcrypt.hash(newOtp, 10);

        UserOtp.otp = newOtp;
        UserOtp.token = hashedOtp;
        await UserOtp.save();

        const options = {
            from: process.env.EMAIL,
            to: req.currentUser!.email,
            subject: "QuickHire Otp verification",
            html: otpMail.replace("***", newOtp),
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

        res.status(200).json({
            status: "success",
            message: "OTP has been sent to your email",
        });
    })
);

export { router as resentOtpRouter };
