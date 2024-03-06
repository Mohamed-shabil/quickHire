import mongoose, { InferSchemaType } from 'mongoose';

const ChatSchema = new mongoose.Schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false,
    }
})

type ChatType = InferSchemaType<typeof ChatSchema>

const Chats = mongoose.model<ChatType>('Chat',ChatSchema);

export { Chats };