import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const PostSchema = new mongoose.Schema({
    creatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    caption:{
        type:String
    },
    media:[{
      url:String
    }],
    report:[{
        userId:{
          type:mongoose.Schema.Types.ObjectId
        },
        createdAt:{
          type:Date,
          default:Date.now
        }
    }]
},{timestamps:true})


type Posts = InferSchemaType<typeof PostSchema>

const PostModel = mongoose.model('Post',PostSchema)

export { PostModel as Posts };