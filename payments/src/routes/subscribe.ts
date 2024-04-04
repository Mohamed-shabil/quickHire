// import { NotAutherizedError, catchAsync, currentUser, isRecruiter } from '@quickhire/common';
// import express,{Request, Response} from 'express';
// import moment from 'moment';
// import Stripe from 'stripe';


// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

// const router = express.Router();

// const stripeSession = async (plan:string,customerId:string)=>{
//     try {
//         const session = await stripe.checkout.sessions.create({
//             mode:'subscription',
//             payment_method_types:['card'],
//             line_items:[
//                 {
//                     price:plan,
//                     quantity:1
//                 }
//             ],
//             success_url:process.env.FRONTEND_LINK!+'/subscription/success',
//             cancel_url:process.env.FRONTEND_LINK!+'/subscription/success',
//             customer:customerId
//         });
//         return session;
//     } catch (error) {
//         return error
//     }
// }



// router.post('/api/payments/subscribe',catchAsync(async(req:Request,res:Response)=>{
//     const { plan } = req.body;
//     const currentUser = req.currentUser
    
//     const planId = plan === 'monthly' ? process.env.MONTHLY_PLAN : process.env.YEARLY_PLAN;

//     if(!currentUser){
//         throw new NotAutherizedError();
//     }

//     const customer = await stripe.customers.create({
//         name:currentUser.name,
//         email:currentUser.email,
//         phone:currentUser.phone,
//         address:{
//             city:'Malappuram',
//             country:"IN",
//             line1:"123 Main Str",
//             line2:'Apt 4B',
//             postal_code:'10001',
//             state:'NY'
//         }
//     })

//     // const session = await stripeSession(planId,customer.id);

//     return res.json({
//         status:'success',
//         // session
//     });
// }))


// export {router as subscriptionRoute}


// router.post('/api/payment/subscribe',isRecruiter,catchAsync(async(req:Request,res:Response)=>{
//     const { sessionId } = req.body;
//     const currentUser = req.currentUser;

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if(session.payment_status === 'paid'){
//         console.log(session);        
//     }

//     res.status(200).json({
//         status:'success',
//         session
//     })
              
// }))



import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);


import { BadRequestError, NotAutherizedError, catchAsync, currentUser, isRecruiter, requireAuth, subscriptionError } from '@quickhire/common';
import express,{Request, Response} from 'express';
import { User } from '../model/UserModel';
import { Subscription } from '../model/SubscriptionModel';

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
        billing_address_collection:'required',
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

