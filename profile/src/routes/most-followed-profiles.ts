import express,{Request, Response} from 'express';
import { catchAsync, requireAuth, isAdmin } from '@quickhire/common'
import { Follow } from '../model/follow'

const router = express.Router();

router.get('/api/profile/most-followed',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    console.log('users is here ....')
    const mostFollowedUsers = await Follow.aggregate([
        {
           $group: {
             _id: "$follow", // Group by the user being followed
             count: { $sum: 1 }, // Count the number of follows
             profile: { $first: "$$ROOT" } // Include the first document of each group
           }
        },
        {
           $sort: { count: -1 } // Sort by count in descending order
        },
        {
           $lookup: {
             from: "profiles", // Assuming the collection name for profiles is "profiles"
             localField: "_id",
             foreignField: "_id",
             as: "profile"
           }
        },
        {
           $unwind: "$profile" // Deconstruct the profile array
        },
        {
           $project: {
             _id: 0, // Exclude the _id field
             profile: 1, // Include the profile field
             count: 1 // Include the count of followers
           }
        }
    ]);

    console.log(mostFollowedUsers)

    res.status(200).json({
        status:'success',
        users:mostFollowedUsers
    })
}))

export { router as mostFollowedUsersRoute }