import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:''
    },
    headLine:{
        type:String,
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    posts:{
        type:mongoose.Schema.Types.ObjectId,
    }
})

type User = InferSchemaType<typeof UserSchema>

const UserModal = mongoose.model('User',UserSchema)

export { UserModal as User };