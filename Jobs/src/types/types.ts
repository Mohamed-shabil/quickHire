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
    createdAt: Date;
    updatedAt: Date;
};