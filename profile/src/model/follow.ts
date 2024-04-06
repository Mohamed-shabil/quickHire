import mongoose,{InferSchemaType} from 'mongoose'

const FollowSchema = new mongoose.Schema({
    // ID of the user following
    followedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    }, 
    // ID of the user being followed
    follow: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile' 
    }, 
    followedAt: { 
        type: Date, 
        default: Date.now 
    }
});

type followingType = InferSchemaType<typeof FollowSchema>

const Follow = mongoose.model<followingType>('follow',FollowSchema)

export { Follow, followingType};