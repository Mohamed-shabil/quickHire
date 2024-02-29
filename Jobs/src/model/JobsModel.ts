import mongoose, { Schema, InferSchemaType } from 'mongoose';

const JobsSchema = new Schema({
    recruiter:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required: true,
    },
    company:{
        type:String,
        required:true
    },
    
    workPlace:{
        type:String,
        enum:['Hybrid','Onsite','Remote']
    },
    employmentType:{
        type:String,
        enum:['Part-time','Full-time','Internship','Freelance']
    },
    jobDescription:{
        type:String,
    },
    requirements:{
        type:String
    },
    skills:{
        type:[String]
    },
    minSalary:{
        type:Number
    },
    maxSalary:{
        type:Number
    }
})

type JobsType = InferSchemaType<typeof JobsSchema>

const Jobs = mongoose.model<JobsType>('Job',JobsSchema)

export { Jobs,JobsType };