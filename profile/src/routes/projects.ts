import express,{Request,Response} from 'express';
import { body, validationResult } from 'express-validator'
import { BadRequestError, NotAutherizedError, requireAuth, validateRequest } from '@quickhire/common';
import catchAsync from '../utils/catchAsync';
import { Profile } from '../model/profile';
const router = express.Router();

router.use(requireAuth);

interface ProjectInterface{
    projectName:string;
    description:string;
    currentlyWorkingOn:boolean;
    startDate:string;
    endDate:string;
    skills:string[];
    links?:string[];
}

router.post('/api/profile/experience',[
    body('projectName')
        .notEmpty()
        .withMessage("Project Name can't empty"),
    body('description')
        .notEmpty()
        .withMessage("description can't be Empty"),
    body('currentlyWorkingOn')
        .notEmpty(),
    body('startDate')
        .notEmpty()
        .withMessage("End Date can't be Empty"),
    body('endDate')
        .notEmpty()
        .withMessage("End Date can't be Empty"),
    body('skills')
        .notEmpty()
        .withMessage("skills can't be empty"),
    body('links')
        .optional(),
    validateRequest,
],catchAsync(async (req:Request,res:Response)=>{
    const error = validationResult(req);
    const {
        projectName, 
        description, 
        currentlyWorkingOn, 
        startDate, 
        endDate, 
        skills, 
        links
    } = req.body;

    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }

    const projectExist = user.projects.some((project)=>{
        return project.projectName === projectName
    })

    if(projectExist){
        throw new BadRequestError('this project is already exist');
    }

    const newProject:ProjectInterface = {
        projectName,
        description,
        currentlyWorkingOn,
        startDate,
        endDate,
        skills,
    }

    if(links){
        newProject.links = links;
    }

    user.projects.push(newProject)
    await user.save();

    return res.status(200).json({
        status:"success",
        projects : user.projects
    })
}))

export {router as projectRoute}