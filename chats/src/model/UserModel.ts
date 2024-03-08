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
    fullName:{
        type:String,
    },
    headLine:{
        type:String,
    }
})

type UserType = InferSchemaType<typeof UserSchema>

const User = mongoose.model<UserType>('User',UserSchema)

export { User };