import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requied:true,
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})


type Comments = InferSchemaType<typeof commentSchema>

const CommentModal = mongoose.model('comments',commentSchema)

export { CommentModal as Comments };