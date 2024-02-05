import {Request,Response,NextFunction} from 'express'
import {AppError} from '@quickhire/common';
import {ProfileModel as Profile,} from '../model/profile'
import {checkSchema} from 'express-validator'

export const setupProfile = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {headline,bio,username,coverImage,avatar} = req.body;

        let profile = await Profile.findOne({_id:req.currentUser!._id});

        if(!profile){
            return next(new AppError('profile not found',404));
        }
        if(headline){
            profile.headline = headline 
        }
        if(bio){
            profile.bio = bio;
        }

        if(username){
            profile.username = username;
        }

        if(coverImage){
            profile.coverImage = coverImage
        }

        if(avatar){
            profile.avatar = avatar
        }

        await profile.save();

        return res.status(200).json({
            status:'success',
            profile
        });

    } catch (error) {
        console.error(error);
        return next(new AppError('Internal Server Error',500));
    }
}


export const addProject = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {projectName,description,skills,currentlyWorkingOn,startDate,endDate,projectImage,links} = req.body;

        let profile = await Profile.findOne({_id:req.currentUser!._id});

        if(!profile){
            return next(new AppError('profile not found',404));
        }

        profile.projects.push({
            projectName,
            description,
            skills,
            currentlyWorkingOn,
            startDate,
            endDate,
            image:projectImage,
            links
        })

        await profile.save();
        return res.status(200).json({
            status:'success',
            profile
        });

    } catch (error) {
        console.error(error);
        return next(new AppError('Internal Server Error',500));
    }
}

export const addEducation = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {school,startDate,endDate,degree,grade} = req.body;

        let profile = await Profile.findOne({_id:req.currentUser!._id});

        if(!profile){
            return next(new AppError('profile not found',404));
        }
        
        profile.education.push({
            school,
            startDate,
            endDate,
            degree,
            grade
        })

        await profile.save();
        return res.status(200).json({
            status:'success',
            profile
        });

    } catch (error) {
        console.error(error);
        return next(new AppError('Internal Server Error',500));
    }
}

export const getFollowers = async (req:Request,res:Response,next:NextFunction)=>{
    try {

        const profile = await Profile.findOne({})

    } catch (error) {
        console.log(error);
        return next(new AppError('Internal server error',500))
    }
}

