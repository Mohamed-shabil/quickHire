import mongoose, { InferSchemaType, Schema } from 'mongoose'
const paymentSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
    },
    stripeId:{
        type:String,
    },
    subscription:{
        types:mongoose.Types.ObjectId,
    }
})

type Payment = InferSchemaType<typeof paymentSchema>

const PaymentModal = mongoose.model('Payment',paymentSchema);

export { PaymentModal as Payment };