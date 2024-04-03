import { catchAsync, isAdmin, requireAuth, validateRequest } from '@quickhire/common';
import express,{ Request, Response } from 'express';
import { body } from 'express-validator';
import { Subscription } from '../model/SubscriptionModel';

const router = express.Router();

router.post('/api/payments/subscription',requireAuth,catchAsync(async(req:Request,res:Response)=>{

    const subscription = Subscription.find();

    res.status(200).json({
        status:"success",
        subscription:subscription
    })
}))

export { router as subscriptionRoute}