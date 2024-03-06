import mongoose,{InferSchemaType} from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ]
})
type ConversationType = InferSchemaType<typeof ConversationSchema>

const UserModal = mongoose.model<ConversationType>('User',ConversationSchema);

export { UserModal as User };