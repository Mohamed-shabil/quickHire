import { timeStamp } from 'console';
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
    contentType:{
        type:String,
        enum:['video','image','text'],
        default:'text'
    },
    content:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false,
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

type ChatType = InferSchemaType<typeof ChatSchema>

const Chats = mongoose.model<ChatType>('Chat',ChatSchema);

export { Chats };