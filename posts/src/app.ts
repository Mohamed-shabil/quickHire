import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { currentUser, errorHandler } from "@quickhire/common";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createPostRoute } from "./routes/createPost";
import { editPostRouter } from "./routes/EditPost";
import { getAllPosts } from "./routes/getAllposts";
import { myPostsRoute } from "./routes/getAllMyPosts";
import { getOnePost } from "./routes/getPost";
import { likePostRouter } from "./routes/likePost";
import { getAllComments } from "./routes/getComments";
import { commentRouter } from "./routes/comments";
import { reportRoute } from "./routes/report-post";
import { trendingPostRoute } from "./routes/trending-posts";
import { reportedPostsRoute } from "./routes/get-reports";
import { deletePostRouter } from "./routes/deletePost";
import { deletepostAdmin } from "./routes/delete-post-admin";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.options(
    "*",
    cors({
        origin: "http://localhost:3000",
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
    console.log(req.currentUser);
    next();
});

app.use(getOnePost);
app.use(reportedPostsRoute);
app.use(getAllPosts);
app.use(createPostRoute);
app.use(editPostRouter);
app.use(myPostsRoute);
app.use(getOnePost);
app.use(likePostRouter);
app.use(getAllComments);
app.use(commentRouter);
app.use(reportRoute);
app.use(deletePostRouter);
app.use(deletepostAdmin);
app.use(trendingPostRoute);

app.use(errorHandler);

export { app };
