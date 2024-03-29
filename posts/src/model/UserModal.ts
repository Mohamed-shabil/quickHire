import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fullName:{
        type:String
    },
    avatar:{
        type:String,
        default:''
    },
    headLine:{
        type:String,
    },
    posts:{
        type:mongoose.Schema.Types.ObjectId,
    },
    saved:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

type User = InferSchemaType<typeof UserSchema>

const UserModal = mongoose.model('User',UserSchema)

export { UserModal as User };