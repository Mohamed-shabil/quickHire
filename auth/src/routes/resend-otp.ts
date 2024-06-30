import express, { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { body, validationResult } from "express-validator";
import {
    BadRequestError,
    NotAutherizedError,
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
        console.log(req.currentUser);

        const currentUser = await User.findById(req.currentUser?._id);
        if (!currentUser) {
            throw new NotAutherizedError();
        }

        const UserOtp = await OtpVerification.findOneAndDelete({
            owner: req.currentUser!._id,
        });

        const otp = randomString.generate({
            length: 4,
            charset: "numeric",
        });

        const hashedOtp = await bcrypt.hash(otp, 10);

        // if(UserOtp){
        //     UserOtp.otp = newOtp;
        //     UserOtp.token = hashedOtp;
        //     await UserOtp.save();
        // }else{

        // }

        const newOtp = await OtpVerification.create({
            owner: currentUser._id,
            otp: otp,
            token: hashedOtp,
        });
        const options = {
            from: process.env.EMAIL,
            to: req.currentUser!.email,
            subject: "QuickHire Otp verification",
            html: otpMail.replace("***", otp),
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
        console.log(newOtp, otp);
        res.status(200).json({
            status: "success",
            message: "OTP has been sent to your email",
        });
    })
);

export { router as resentOtpRouter };
