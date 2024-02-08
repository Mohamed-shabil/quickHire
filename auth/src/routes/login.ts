import express,{Request,Response} from 'express'
import { body, validationResult } from 'express-validator'
import { validateRequest, BadRequestError} from '@quickhire/common'
import bcrypt from 'bcryptjs'
import { User } from '../model/user';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email ID is not valid or not provided'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
],
async(req:Request,res:Response)=>{
    try {
        const error = validationResult(req);
        const {email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new BadRequestError('Account does not exist')
        }

        const isValidPassword = await bcrypt.compare(password,existingUser.password);

        const payload = {
            _id:existingUser._id,
            email:existingUser.email,
            phone:existingUser.phone,
            name:existingUser.name,
        }

        const token = jwt.sign(payload,process.env.JWT_KEY!)
        const cookieOption = {
            expires: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
            withCredintials : true
        }
        
        res.cookie('jwt',token,cookieOption)
        return res.status(200).json({
            user:payload,
            token
        })
    } catch (error) {
        console.log(error);
    }

})


export {router as loginRouter}