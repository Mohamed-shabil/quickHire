import mongoose, { InferSchemaType, Mongoose } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:''
    }
})

type UserType = InferSchemaType<typeof UserSchema>

const User = mongoose.model<UserType>('User',UserSchema)

export { User };