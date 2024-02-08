import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
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
    }
})

type UserType = InferSchemaType<typeof userSchema>

const User = mongoose.model('User',userSchema)

export { User,UserType };