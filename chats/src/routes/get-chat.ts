import { NotAutherizedError, catchAsync, requireAuth } from "@quickhire/common";
import express, { Request, Response } from "express";
import { Conversation } from "../model/ConversationModel";
import { Chats } from "../model/ChatModel";
import mongoose from "mongoose";

const router = express.Router();

router.get(
    "/api/chats/get-chats",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        if (!req.currentUser?._id) {
            throw new NotAutherizedError();
        }

        const chats = await Conversation.aggregate([
            {
                $match: {
                    members: {
                        $in: [new mongoose.Types.ObjectId(req.currentUser._id)],
                    },
                },
            },
            {
                $lookup: {
                    from: "chats",
                    let: { conversationId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$conversation", "$$conversationId"],
                                },
                            },
                        },
                        {
                            $sort: { time: -1 },
                        },
                        {
                            $limit: 1,
                        },
                    ],
                    as: "lastMessage",
                },
            },
            {
                $unwind: "$lastMessage",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "participants",
                },
            },
            {
                $addFields: {
                    user: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$participants",
                                            cond: {
                                                $ne: [
                                                    "$$this._id",
                                                    new mongoose.Types.ObjectId(
                                                        req.currentUser._id
                                                    ),
                                                ],
                                            },
                                        },
                                    },
                                    0,
                                ],
                            },
                            { message: "$lastMessage" },
                        ],
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$user",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    avatar: 1,
                    fullName: 1,
                    headLine: 1,
                    message: 1,
                },
            },
        ]);

        console.log(chats);

        return res.status(200).json({
            status: "success",
            chats,
        });
    })
);

export { router as getAllChatsRoute };
