export const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export type Experience = {
    companyName: string;
    startDate: {
      startMonth: string;
      startYear: string;
    };
    endDate: {
      endMonth: string;
      endYear: string;
    };
    position: string;
};
  
export type Education = {
    school: string;
    startDate: {
      startMonth: string;
      startYear: string;
    };
    endDate: {
      endMonth: string;
      endYear: string;
    };
    degree: string;
    grade: string;
};
  
export type Project = {
    projectName: string;
    description: string;
    skills: string[];
    currentlyWorkingOn: boolean;
    startDate: string;
    endDate: string;
    image: string;
    links: string[];
};
  
export type User = {
    avatar:string;
    userId: string;
    fullName?: string;
    headline?: string;
    bio?: string;
    email:string;
    portfolio?: string;
    customUrl?: {
      urlName: string;
      url: string;
    };
    location?: string;
    profileType?: 'seeker' | 'recruiter' | 'admin';
    username: string;
    phone?: string;
    coverImage?: string;
    experience?: Experience[];
    education?: Education[];
    projects?: Project[];
    followers?: string[]; 
    following?: string[];
}

// posts type
export interface Media {
  url: string;
}

interface Like {
  userId: string;
  postId:string;
  createdAt?: Date;
}

interface Comment {
  userId: string;
  comment: string;
  createdAt?: Date;
}

interface Report {
  userId?: string;
  createdAt?: Date;
}


export type PostType = {
  _id:string;
  creator: {
    _id:string,
    avatar:string,
    name:string;
    headLine:string;
    followers:string[],
    followings:string[]
  };
  caption?: string;
  media?: Media[];
  liked:boolean;
  followingCreator:boolean;
  comments?: Comment[];
  likes:[],
  report?: Report[];
  createdAt:Date
}

export type UserType = 'seeker' | 'admin' | 'recruiter'

export type ContentType = 'text'|'video'|'image'

export type Chats = {
  content:string,
  contentType:ContentType
  reciever :string,
  sender:string,
  read:boolean
  time: Date
} 

export interface ChatUser {
  _id:string
  avatar: string;
  fullName:string;
  headline:string;
  name:string
  message:Chats
}

type workPlace = 'Hybrid' | 'Onsite' | 'Remote'
type employmentType = 'Part-time' | 'Full-time' | 'Freelancer' 

export interface Jobs{
  _id:string;
  recruiter: string;
  title:string;
  company:string;
  companyImage:string;
  workPlace: workPlace;
  employmentType: employmentType;
  jobDescription:string;
  requirements: string,
  skills:string[],
  minSalary:number,
  maxSalary:number
}