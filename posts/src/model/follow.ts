import mongoose,{InferSchemaType} from 'mongoose'

const FollowSchema = new mongoose.Schema({
    // ID of the user following
    followedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    // ID of the user being followed
    follow: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    followedAt: { 
        type: Date, 
        default: Date.now 
    }
});

type FollowType = InferSchemaType<typeof FollowSchema>

const Follow = mongoose.model<FollowType>('follow',FollowSchema)

export { Follow, FollowType};