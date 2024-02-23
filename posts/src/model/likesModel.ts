import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const LikesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts",
        requied:true,
    }
},{timestamps:true})


type Likes = InferSchemaType<typeof LikesSchema>

const LikesModel = mongoose.model('Like',LikesSchema)

export { LikesModel as Likes };