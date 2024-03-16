import express,{Request,Response} from 'express';
import { body, validationResult } from 'express-validator'
import { BadRequestError, NotAutherizedError, currentUser, requireAuth, validateRequest } from '@quickhire/common';
import catchAsync from '../utils/catchAsync';
import { Profile } from '../model/profile';
const router = express.Router();

router.post('/api/profile/experience',requireAuth,[
    body('companyName')
        .notEmpty()
        .withMessage("Company Name can't empty"),
    body('position')
        .notEmpty()
        .withMessage("Position can't be Empty"),
    body('startMonth')
        .notEmpty()
        .withMessage("Start Month can't be Empty"),
    body('startYear')
        .notEmpty()
        .withMessage("Start Year can't be Empty"),
    body('endMonth')
        .notEmpty()
        .withMessage("End Month Can't be Empty"),
    body('endYear')
        .notEmpty()
        .withMessage("End Year Can't be Empty"),
    validateRequest,
],catchAsync(async (req:Request,res:Response)=>{
    const error = validationResult(req);

    const {companyName, position, startMonth, startYear, endMonth, endYear} = req.body;

    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }

    const experienceExist = user.experience.some((exp)=>{
        return exp.companyName === companyName && exp.position === position
    })

    if(experienceExist){
        throw new BadRequestError('Experience already exist');
    }

    user.experience.push({
        companyName,
        startDate:{
            startMonth,
            startYear
        },
        endDate:{
            endMonth,
            endYear
        },
        position
    })

    await user.save();
    
    return res.status(200).json({
        status:"success",
        experience : user.experience
    })
}))


router.patch('/api/profile/experience/delete',requireAuth,[
    body('experienceId')
        .notEmpty()
        .withMessage("Experience ID Can't be Empty"),
    validateRequest,
],catchAsync(async (req:Request,res:Response)=>{

    const { experienceId } = req.body;

    const profile = await Profile.findOneAndUpdate({userId:req.currentUser?._id},{$pull:{experience:{_id:experienceId}}});
    
    return res.status(200).json({
        status:"success",
        experience : profile?.experience
    })
}))



export {router as experienceRouter}


