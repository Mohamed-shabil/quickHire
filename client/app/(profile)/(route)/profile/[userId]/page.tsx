import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LinkCard from "@/components/Profile/LinkCard";
import { ExperienceCard } from "@/components/Profile/ExperienceCard";
import { Heading } from "@/components/Heading";
import { Container } from "@/components/Container";
import { redirect } from "next/navigation";
import { EducationCard } from '@/components/Profile/EducationCard'

import {User,Education,Project,Experience} from '@/constants/constants'
import axios from "axios";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import { ProfileOptions } from "@/components/Profile/ProfileOption";

interface Link {
    title:string;
    content:string;
    url:string;
}



const getProfile = async (token:string,userId:string) =>{
    axios.defaults.withCredentials = true;
    const res = await axios.get(`http://localhost:3003/api/profile/${userId}`,{
        headers: {
            Cookie: `jwt=${token}`
        }
    });
    return res.data.profile;
}

export default async function Profile({params}:{params:{userId:string}}) {

    const token = cookies().get('jwt')?.value;
    const {userId} = params;
    if(!token){
        return redirect('/signup'); 
    }
    const profile = await getProfile(token,params.userId);

    const gotoChat = ()=>{
        redirect(`/chats/${userId}`);
    }
 

    const links= [
        {
            title: "Email",
            content: profile.email,
            url: "#",
        },
        ...(profile.location ? [{title:"Location",content:profile.location,url:'#'}]:[]),
        ...(profile.portfolio ? [{title:"Portfolio",content:profile.portfolio,url:profile.portfolio}]:[]),
        ...(profile.portfolio ? [{title:profile.customUrl?.urlName,content:profile.customUrl?.url,url:profile.customUrl?.url}]:[])
    ]
    
    return (
        <main className="mb-10">
            <section>
                <img
                    className="max-h-56 w-screen object-cover"
                    src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1361.25&fit=crop&crop=faces"
                    alt=""
                />
            </section>
            <Container className="justify-between -mt-8 gap-6">
                <section className="flex gap-4 align-middle flex-col md:flex-row">
                    <span className="relative">
                        <Avatar className="w-36 h-36 border-4 shadow-xl border-white">
                            <AvatarImage src={profile.avatar} className="object-cover"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </span>
                    <div className="my-auto">
                        <p className="font-bold text-2xl">{profile.fullName || profile.username}</p>
                        <p className="text-slate-400">{profile.headline || profile.email}</p>
                    </div>
                </section>
                <section className="flex gap-4 my-auto">
                    {/* <ProfileOptions profile={profile}/> */}
                </section>
            </Container>
            <Separator className="container my-8" />
            {profile.bio? 
            <Container>
                <Heading variant="profile-side">About Me</Heading>
                <section className="flex-grow space-y-6">
                    <section>
                        <p className="mb-2 text-sm">{profile.bio}</p>
                        <small className="text-primary font-bold text">
                            Read more
                        </small>
                    </section>
                
                    <section className="flex md:bg-accent md:p-4 p-0 justify-between rounded text-primary flex-col gap-4 lg:flex-row">
                        {links.map((link,i)=>(
                            // @ts-ignore
                            <LinkCard key={i} link={link}/>
                        ))}
                    </section>
                </section>
            </Container> : <></>
            }

            <Separator className="container my-8" />
            {profile.experience?.length ? 
                <Container>
                    <Heading variant="profile-side">Experience</Heading>
                    <section className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {profile.experience.map((experience:Experience,index:number) => (
                            <ExperienceCard key={index} experience={experience} />
                        ))}
                    </section>
                </Container> :
                <></>         
            }
            <Separator className="container my-8 " />
            {profile.projects?.length ? 
                <Container>
                    <Heading variant="profile-side">Projects</Heading>
                    <section className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {profile.experience?.map((experience:Experience,index:number) => (
                            <ExperienceCard key={index} experience={experience} />
                        ))}
                    </section>
                </Container> :
                <></>         
            }
            <Separator className="container my-8 " />
            {profile.education?.length ? 
                <Container>
                    <Heading variant="profile-side">Education</Heading>
                    <section className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {profile.education.map((education:Education,index:number) => (
                            <EducationCard key={index} education={education} />
                        ))}
                    </section>
                </Container> :
                <></>         
            }
        </main>
    );
}

