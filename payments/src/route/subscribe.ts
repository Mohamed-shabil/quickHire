import { NotAutherizedError, catchAsync, currentUser, isRecruiter } from '@quickhire/common';
import express,{Request, Response} from 'express';
import moment from 'moment';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

const router = express.Router();

const stripeSession = async (plan:string,customerId:string)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            mode:'subscription',
            payment_method_types:['card'],
            line_items:[
                {
                    price:plan,
                    quantity:1
                }
            ],
            success_url:process.env.FRONTEND_LINK!+'/subscription/success',
            cancel_url:process.env.FRONTEND_LINK!+'/subscription/success',
            customer:customerId
        });
        return session;
    } catch (error) {
        return error
    }
}



router.post('/api/payments/subscribe',catchAsync(async(req:Request,res:Response)=>{
    const { plan } = req.body;
    const currentUser = req.currentUser
    
    const planId = plan === 'monthly' ? process.env.MONTHLY_PLAN : process.env.YEARLY_PLAN;

    if(!currentUser){
        throw new NotAutherizedError();
    }

    const customer = await stripe.customers.create({
        name:currentUser.name,
        email:currentUser.email,
        phone:currentUser.phone,
        address:{
            city:'Malappuram',
            country:"IN",
            line1:"123 Main Str",
            line2:'Apt 4B',
            postal_code:'10001',
            state:'NY'
        }
    })

    // const session = await stripeSession(planId,customer.id);

    return res.json({
        status:'success',
        // session
    });
}))


export {router as subscriptionRoute}


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

