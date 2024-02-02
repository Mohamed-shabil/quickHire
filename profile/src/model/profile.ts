import mongoose, { Schema, InferSchemaType } from 'mongoose';

const profileSchema = new Schema({
    profileType:{
        type:String,
        enum:['personal','organisation','group']
    },
    fullName: {
        type:String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    username:{
        type: String,
        required:true,
        unique:true,
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
        organisation: String,
        startDate: Date,
        endDate: Date,
        position:"String"
    }],
    education:[{
        school: String,
        startDate: Date,
        endDate: Date,
        degree: String,
        grade : String
    }],
    projects:[{
        projectName:String,
        description: String,
        Skills: [String],
        currentlyWorkingOn:Boolean,
        startDate:Date,
        endDate:Date,
        image:String,
        links:[String]
    }],
    followers:[{
        type: mongoose.Types.ObjectId
    }],
    following:[{
        type: mongoose.Types.ObjectId
    }]

})

type Profile = InferSchemaType<typeof profileSchema>

const ProfileModel = mongoose.model('User',profileSchema)

export { ProfileModel }