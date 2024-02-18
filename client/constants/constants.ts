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
    profileType?: 'personal' | 'organisation' | 'group';
    username: string;
    phone?: string;
    coverImage?: string;
    experience?: Experience[];
    education?: Education[];
    projects?: Project[];
    followers?: string[]; 
    following?: string[];
}