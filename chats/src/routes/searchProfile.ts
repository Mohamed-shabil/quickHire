import express,{ Request, Response } from "express";
import { requireAuth } from "@quickhire/common";
import {catchAsync} from "@quickhire/common";
import {User} from '../model/UserModel'

const router = express.Router();

router.get('/api/chats/searchProfile',catchAsync(async(req:Request,res:Response)=>{
    console.log('im reaching here ./.....')
    const name = req.query.name;
    const regex = new RegExp(`^${name}`, 'i');
    console.log("QUERY:",regex);
    const users = await User.find({ fullName: regex });
    console.log('RESULTS',users);
    return res.status(200).json({
        status:'success',
        users,
    })
}))


export {router as searchProfile}