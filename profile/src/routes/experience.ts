import express,{Request,Response} from 'express';
import { body, validationResult } from 'express-validator'
import { BadRequestError, NotAutherizedError, requireAuth, validateRequest } from '@quickhire/common';
import catchAsync from '../utils/catchAsync';
import { Profile } from '../model/profile';
const router = express.Router();

router.use(requireAuth);

router.post('/api/profile/experience',[
    body('companyName')
        .notEmpty()
        .withMessage("Company Name can't empty"),
    body('position')
        .notEmpty()
        .withMessage("Position can't be Empty"),
    body('startDate')
        .notEmpty()
        .withMessage("Start Date can't be empty"),
    body('endDate')
        .notEmpty()
        .withMessage("End Date can't be Empty"),
    validateRequest,
],catchAsync(async (req:Request,res:Response)=>{
    const error = validationResult(req);
    const {companyName, position, startDate, endDate} = req.body;

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
        startDate,
        endDate,
        position
    })

    await user.save();
    
    return res.status(200).json({
        status:"success",
        experience : user.experience
    })
}))

export {router as experienceRouter}