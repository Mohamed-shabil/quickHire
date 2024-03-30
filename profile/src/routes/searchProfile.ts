import express,{ Request, Response } from "express";
import { requireAuth } from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import {Profile} from '../model/profile'

const router = express.Router();

router.get('/api/profile/searchProfile',catchAsync(async(req,res)=>{
    const name = req.query.name;
    const regex = new RegExp(`^${name}`, 'i');
    const users = await Profile.find({ fullName: regex });
    console.log(users);
    return res.status(200).json({
        status:'success',
        users
    })
}))


export {router as searchProfile}