import mongoose, { InferSchemaType } from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    planName:{
        type:String,
        required:true
    },
    postLimit:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    billingPeriod:{
        type:String,
        required:true,
        enum:['monthly','6-months','3-months','yearly']
    }
})

type Subscription = InferSchemaType<typeof subscriptionSchema>

const subscriptionModel = mongoose.model('payment',subscriptionSchema);

export { subscriptionModel as Subscription };