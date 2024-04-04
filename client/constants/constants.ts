export const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export type Experience = {
    _id:string
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
    _id:string;
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
    _id:string;
    projectName: string;
    description: string;
    skills: string[];
    currentlyWorkingOn: boolean;
    startDate: string;
    endDate: string;
    image: string;
    links: string[];
};
  
export type Profile = {
    avatar:string;
    _id: string;
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

export type creator= {
  _id:string,
  avatar:string,
  name:string;
  headLine:string;
  followers:string[],
  followings:string[]
}
export type PostType = {
  _id:string;
  creator: creator[];
  creatorId: string;
  caption?: string;
  media?: Media[];
  liked:boolean;
  followingCreator:boolean;
  comments?: Comment[];
  isLikedByCurrentUser:boolean;
  isFollowing:boolean;
  totalLikes:number;
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
  location:string;
  experience:string;
  openings:number;
  isActive:boolean;
  appliedAt?:Date
}



export type Resume = {
  url:string,
  user:string,
  fileName:string
}


export type Application = {
  _id:string,
  recruiter:string,
  jobId: Jobs,
  resume:string,
  email:string,
  phone:string,
  applicantId:string,
  status:string,
  owner:any;
}

export type follower = {
  follow: Profile,
  followedBy:Profile|string,
  _id:string
}


export type User = {
  experience: any;
  _id:string,
  name:string,
  email:string,
  phone:string,
  verified:boolean,
  isBlocked:boolean,
  avatar:string,
  fullName:string,
  headLine:string,
  role: UserType
}

export const ADMIN = 'admin'
export const SEEKER = 'seeker'
export const RECRUITER = 'recruiter'

export type billingPeriod = 'week' | 'month' | 'year'

export type Subscription = {
  _id:string;
  planName:string;
  postLimit:number;
  price:number;
  description:string;
  billingPeriod:billingPeriod
}