import mongoose, { Schema, InferSchemaType, Mongoose } from 'mongoose';

const userSchema = new Schema({
    name: {
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    fullName:{
        type:String
    },
    headLine:{
        type:String
    },
    avatar:{
        type:String
    },
    subscription:{
        type: mongoose.Types.ObjectId,
        ref:'subscriptions'
    },
    stripeUserId:{
        type:String,
    }
})

type UserType = InferSchemaType<typeof userSchema>

const User = mongoose.model<UserType>('User',userSchema)

export { User,UserType };