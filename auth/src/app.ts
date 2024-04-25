import express, { urlencoded, json } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { NotFoundError, errorHandler, currentUser } from "@quickhire/common";

import { signupRouter } from "./routes/signup";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { currentUserRouter } from "./routes/current-user";
import { forgotPasswordRouter } from "./routes/forgot-password";
import { resentOtpRouter } from "./routes/resend-otp";
import { verifyOtpRouter } from "./routes/verify-otp";
import { googleAuthRouter } from "./routes/verifyAuth";
import { resetPasswordRouter } from "./routes/reset-password";
import { roleRouter } from "./routes/setup-role";
import { blockUserRoute } from "./routes/block-user";
import { getAllUsersRoute } from "./routes/get-all";
import { adminLoginRoute } from "./routes/admin-login";
import { unblockUserRoute } from "./routes/unblock-user";

export const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: ["POST", "GET", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.options(
    "*",
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.set("trust proxy", true);

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use(currentUser);

app.use((req, res, next) => {
    console.log("CurrentUser :-", req.currentUser);
    next();
});

app.use(signupRouter);
app.use(verifyOtpRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);
app.use(forgotPasswordRouter);
app.use(resentOtpRouter);
app.use(resetPasswordRouter);
app.use(googleAuthRouter);
app.use(roleRouter);
app.use(blockUserRoute);
app.use(unblockUserRoute);
app.use(getAllUsersRoute);
app.use(adminLoginRoute);
app.use(currentUserRouter);

app.all("*", () => {
    console.log("route not found 404");
    throw new NotFoundError("route not found");
});

app.use(errorHandler);
