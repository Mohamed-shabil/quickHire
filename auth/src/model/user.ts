import mongoose, { Schema, InferSchemaType } from 'mongoose';

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
    password:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    verified:{
        type: Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['seeker','recruiter','admin'],
        default:'seeker'
    }
})

type UserType = InferSchemaType<typeof userSchema>

const User = mongoose.model<UserType>('User',userSchema)

export { User,UserType };