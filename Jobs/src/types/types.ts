export type IJobsType = {
    recruiter:string;
    recruiterName:string;
    title:string;
    company:string;
    companyImage:string | undefined;
    workPlace:string;
    employmentType:string;
    jobDescription:string;
    requirements:string;
    skills:string[];
    minSalary:number;
    maxSalary:number;
    openings:number;
    experience:string;
    location:string;
}

export type IDJobsType = IJobsType &{
    _id:string;
    isActive:boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type IUserType = {
    _id:string;
    name:string;
    email:string;
    headLine?:string;
    phone?:string;
    avatar?:string;
    fullName?:string;
}

export type IDUserType = IUserType & {
    createdAt: Date;
    updatedAt: Date;
}


export type IApplication = {
    recruiter:string;
    job:string;
    resume:string;
    applicantId:string;
    email:string;
    phone:string;
}

export type IDApplication = IApplication & {
    _id:string;
    status:string;
    owner:IDUserType;
    createdAt: Date;
    updatedAt: Date;
}


export type IResume = {
    user:string;
    url:string;
    fileName:string;
}

export type IDResume = IResume & {
    _id:string;
    createdAt: Date;
    updatedAt: Date;
}