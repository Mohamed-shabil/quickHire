import { Request,Response,NextFunction } from "express";
import AppError from "../utils/appError";
import { UserModel as User } from "../model/user";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { username, email, password, confirmPassword, phone} = req.body;
        
        if( !username|| !email|| !password || !phone){
            return next(new AppError('Some fields are missing',400))
        }
        
        if(password !== confirmPassword){
            return next(new AppError('Passwords are not matching',400))
        }
        console.log('BODY User : - ', username, email , password, confirmPassword , phone);
        
        const userExist = await User.findOne({email});

        if(userExist){
            return next(new AppError('User with email already Exist',400));
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name: username,
            email,
            password:hashedPassword,
            phone
        })
        
        await user.save();

        const payload = {
            name:user.name,
            email:user.email,
            phone:user.phone,
        }

        const token = jwt.sign(payload,process.env.JWT_KEY!);
        const cookieOptions = {
            expires: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
        };
        res.cookie("jwt", token, cookieOptions);
        return res.status(201).json({
            status:"success",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return next(new AppError('Internal Server Error',500));
    }
}

// Signin
export const login = async (req:Request ,res:Response, next:NextFunction) => {
    try {
        const {password, email} = req.body;
        const currentUser = await User.findOne({email})
        
        if(!currentUser){
            console.log('No - currentUser');
            return next(new AppError('invalid email or password',400))
        }

        const isMatch = await bcrypt.compare(password,currentUser.password);
        currentUser.password = '';
        console.log(isMatch);
        if(!isMatch){
            console.log('No - currentUser');
            return next(new AppError('invalid email or Password',400))
        }
        
        const payload = {
            _id:currentUser._id,
            name:currentUser.name,
            email:currentUser.email,
            phone:currentUser.phone,
        }

        const token = jwt.sign(payload,process.env.JWT_KEY!);
        const cookieOptions = {
            expires: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
        };
        console.log(payload);
        res.cookie('jwt',token,cookieOptions);  

        return res.status(200).json({
            status:'success',
            user:payload,
        })
    } catch (error) {
        return next(new AppError('Internal Server Error',500));
    }
}


// Signout

export const logout = (req:Request, res:Response)=>{
    res.clearCookie('jwt');
    return res.status(200).json({
        data: null
    })
}