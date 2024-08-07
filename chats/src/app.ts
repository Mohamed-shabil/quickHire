import express, { json, urlencoded } from "express";
import http from "http";
import socketio, { Socket } from "socket.io";
import SocketService from "./socket/socket";
import { saveChatRouter } from "./routes/save-chat";
import { currentUser, errorHandler } from "@quickhire/common";
import cookieParser from "cookie-parser";
import cors from "cors";
import { chatHistoryRoute } from "./routes/get-chat-history";
import { getAllChatsRoute } from "./routes/get-chat";
import { searchProfile } from "./routes/search-profile";
import morgan from "morgan";

const app = express();

app.set("trust proxy", true);

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

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));

app.use(currentUser);

app.use(saveChatRouter);
app.use(chatHistoryRoute);
app.use(getAllChatsRoute);
app.use(searchProfile);

app.use(errorHandler);

const socketService = new SocketService();

const httpServer = http.createServer();

socketService.io.attach(httpServer);

export { socketService, httpServer, app };
