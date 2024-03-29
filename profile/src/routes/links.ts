import { NotAutherizedError, requireAuth, validateRequest } from "@quickhire/common";
import { body, validationResult } from "express-validator";
import catchAsync from "../utils/catchAsync";
import express,{Request,Response} from 'express'
import { Profile } from "../model/profile";

const router = express.Router();

router.patch('/api/profile/links',requireAuth,[
    body('location')
        .notEmpty()
        .withMessage("Location can't be empty"),
    body('portfolio')
        .optional()
        .isURL()
        .withMessage('Invalid Portfolio Url'),
    body('customUrl')
        .optional()
        .isURL()
        .withMessage("Invalid Custom Url"),
    body('urlName')
        .optional(),
    validateRequest,
],catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const {location, portfolio, customUrl, urlName} = req.body;
    const userProfile = await Profile.findOne({_id:req.currentUser?._id})
    
    if(!userProfile){
        throw new NotAutherizedError();
    }
    userProfile.portfolio = portfolio;
    userProfile.customUrl = {
        url:customUrl,
        urlName:urlName
    }
    userProfile.location = location;
    await userProfile.save();
    return res.status(200).json({
        status:'success',
        profile:userProfile
    });
}))


export {router as linksRouter}