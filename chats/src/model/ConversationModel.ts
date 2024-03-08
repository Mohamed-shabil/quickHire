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

const Conversation = mongoose.model<ConversationType>('Conversation',ConversationSchema);

export { Conversation };