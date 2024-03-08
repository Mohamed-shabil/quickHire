import { NotAutherizedError, catchAsync, requireAuth } from '@quickhire/common';
import express,{Request,Response} from 'express';
import { Conversation } from '../model/ConversationModel';
import { Chats } from '../model/ChatModel';

const router = express.Router();

router.get('/api/chats/history/:userId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const userId = req.params.userId

    if(!req.currentUser?._id){
        throw new NotAutherizedError();
    }

    const isConvoExist = await Conversation.findOne({
        members:{
            $all:[req.currentUser._id,userId]
        }
    })
    console.log(isConvoExist);

    if(!isConvoExist){
        return res.status(200).json({
            status:'status',
            chats:[],
        })
    }

    const chats = await Chats.find({conversation:isConvoExist._id});
    console.log(chats);

    res.status(200).json({
        status:'success',
        chats
    });
}))

export {router as chatHistoryRoute}