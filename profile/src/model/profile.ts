import mongoose, { Schema, InferSchemaType } from 'mongoose';

const profileSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    profileType:{
        type:String,
        enum:['personal','organisation','group']
    },
    fullName: {
        type:String,
    },
    headline:{
        type:String,
    },
    email:{
        type: String,
        unique:true
    },
    username:{
        type: String,
        required:true,
    },
    phone:{
        type:String
    },
    avatar:{
        type: String,
        default:""
    },
    bio:{
        type: String
    },
    coverImage:{
        type:String,
        default:''
    },
    experience:[{
        companyName: String,
        startDate: Date,
        endDate: Date,
        position: String
    }],
    education:[{
        school: String,
        startDate: String,
        endDate: String,
        degree: String,
        grade : String
    }],
    projects:[{
        projectName:String,
        description: String,
        skills: [String],
        currentlyWorkingOn:Boolean,
        startDate: String,
        endDate: String,
        image:String,
        links:[String]
    }],
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'profile'
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'profile'
    }]
})

type Profile = InferSchemaType<typeof profileSchema>

const ProfileModel = mongoose.model('Profile',profileSchema)

export { ProfileModel as Profile };