import mongoose, { Mongoose } from 'mongoose';

const PostSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true  
    },
    caption:{
        type:String
    },
    media:{
        type:URL,
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