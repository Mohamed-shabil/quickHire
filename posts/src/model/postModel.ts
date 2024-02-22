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
    likesCount:{
      type: Number,
      default:0
    },
    likes: [
        {
          userId: {
            type: String,
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
    ],
    comments: [
        {
          userId: {
            type: String,
            required: true
          },
          comment: {
            type: String,
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
    ],
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