import mongoose, { InferSchemaType, Mongoose } from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String,
        },
        media: [
            {
                url: String,
            },
        ],
        report: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                reason: {
                    type: String,
                    enum: [
                        "spam or misleading content",
                        "hate speech or harassment",
                        "violence or graphic content",
                        "nudity or adult content",
                        "intellectual property infringement",
                        "impersonation or fake accounts",
                        "privacy violation",
                        "false information",
                        "inappropriate language or behavior",
                    ],
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

type Posts = InferSchemaType<typeof PostSchema>;

const PostModel = mongoose.model("Post", PostSchema);

export { PostModel as Posts };
