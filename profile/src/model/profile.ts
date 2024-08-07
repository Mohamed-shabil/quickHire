import mongoose, { Schema, InferSchemaType } from 'mongoose';

const profileSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    },
    fullName: String,
    headline: String,
    bio: String,
    email:String,
    portfolio:{
        type:String,
    },
    customUrl:{
        urlName : String,
        url : String
    },
    location:String,
    profileType:{
        type:String,
        enum:['seeker','recruiter','admin'],
    },
    phone:{
        type:String
    },
    coverImage:{
        type:String,
        default:''
    },
    experience:[{
        companyName: String,
        startDate: {
            startMonth:String,
            startYear:String,
        },
        endDate: {
            endMonth:String,
            endYear:String
        },
        position: String
    }],
    education:[{
        school: String,
        startDate: {
            startMonth:String,
            startYear:String,
        },
        endDate: {
            endMonth:String,
            endYear:String
        },
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

})

type ProfileType = InferSchemaType<typeof profileSchema>

const ProfileModel = mongoose.model<ProfileType>('Profile',profileSchema)

export { ProfileModel as Profile,ProfileType };