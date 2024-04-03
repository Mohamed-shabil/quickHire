import mongoose, { InferSchemaType } from 'mongoose'
const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    stripeId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    subscription:{
        types:mongoose.Types.ObjectId,
        ref:'subscriptions',
        required:true
    }
})

type Payment = InferSchemaType<typeof paymentSchema>

const PaymentModal = mongoose.model('payment',paymentSchema);

export { PaymentModal as Payment };