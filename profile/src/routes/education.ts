import express,{Request,Response} from 'express';
import {body, validationResult} from 'express-validator';
import catchAsync from '../utils/catchAsync';
import { Profile } from '../model/profile';
import { BadRequestError, NotAutherizedError, requireAuth, validateRequest } from '@quickhire/common'

const router = express.Router();

router.use(requireAuth);

router.post('/api/profile/education',[
    body('school')
        .notEmpty()
        .withMessage("School can't be Empty"),
    body('degree')
        .notEmpty()
        .withMessage("Degree Can't be Empty"),
    body('startDate')
        .notEmpty()
        .withMessage("Start Date can't be Empty"),
    body('endDate')
        .notEmpty()
        .withMessage("Degree Can't be Empty"),
    body('grade')
        .notEmpty()
        .withMessage("grade Can't be empty"),
    validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const {school, degree, startDate,endDate,grade} = req.body;
    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }
    
    const degreeExist =  user.education.some((edu)=> edu.degree == degree);

    if(degreeExist){
        throw new BadRequestError('This Degree is already Exist in your profile');
    }

    user.education.push({   
        school,
        degree,
        startDate,
        endDate,
        grade
    });
    
    await user.save();
    return res.status(200).json({
        status:"success",
        education:user.education,
    });
}))



export {router as educationRouter}