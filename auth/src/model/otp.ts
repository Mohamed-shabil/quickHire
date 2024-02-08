import mongoose, { InferSchemaType } from 'mongoose'
import bcrypt from 'bcryptjs'

const otpVerificationSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:3600,
        default:Date.now()
    }
});

type UserType = InferSchemaType<typeof otpVerificationSchema>

const OtpVerification = mongoose.model("OtpVerification",otpVerificationSchema);

export default OtpVerification;