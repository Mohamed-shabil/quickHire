import { stripe } from '../utils/stripe'
import express,{Request, Response} from 'express';
import { User } from '../model/UserModel';
import { Subscription } from '../model/SubscriptionModel';
import { BadRequestError, NotAutherizedError, catchAsync, currentUser, isRecruiter, requireAuth, subscriptionError } from '@quickhire/common';

const router = express.Router();


router.post('/api/payments/subscribe/:subscriptionId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    
    const currentUser = req.currentUser;
    const subscriptionId = req.params.subscriptionId
    const user = await User.findById({_id:currentUser?._id});

    if(!user){
        throw new NotAutherizedError();
    }

    if(!user.stripeUserId){
        const customer = await stripe.customers.create({
            email:user.email,
            name:user.name,
            ...(user.phone && {phone:user.phone}),
            metadata:{
                userId:user._id.toString()
            },
            address:{
                city:'New York',
                country:'US',
                line1:'123 Main Street',
                line2:'Apt 4b',
                postal_code:'10001',
                state:'NY'
            }
        });

        user.stripeUserId = customer.id;
        await user.save();
    }

    const customer = await stripe.customers.retrieve(user.stripeUserId);
    
    const subscriptions = await stripe.subscriptions.list({
        customer:customer.id,
        status:'active',
        limit:1,
    });

    if(subscriptions.data.length){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer:customer.id,
            return_url:`${process.env.CORS_ORIGIN!}/subscription`
        });
        throw new subscriptionError('User already Subscribed to a plan',{redirectUrl:stripeSession.url});
    }


    const subscription = await Subscription.findById({_id:subscriptionId});
    if(!subscription){
        throw new BadRequestError('No Subcription with given Subscription ID')
    }
    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.CORS_ORIGIN!}/subscription/success`,
        cancel_url:`${process.env.CORS_ORIGIN!}/subscription/cancel`,
        payment_method_types:['card'],
        mode:"subscription",
        line_items:[
            {
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:user.fullName || user.name,
                    },
                    unit_amount: subscription.price * 100,
                    recurring:{
                        interval: subscription.billingPeriod
                    },
                },
                quantity:1
            },
        ],
        metadata:{
            userId:user._id.toString(),
            subscription:subscription._id.toString(),
        },
        customer: customer.id,
    });

    res.status(201).json({
        status:'success',
        session
    })

}))

export { router as SubscribeRoute}