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
    }
})

type User = InferSchemaType<typeof userSchema>

const UserModel = mongoose.model('User',userSchema)

export {UserModel}