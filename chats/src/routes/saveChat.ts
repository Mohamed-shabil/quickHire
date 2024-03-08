import express,{Request, Response,} from 'express';
import { catchAsync, requireAuth, validateRequest, NotAutherizedError} from '@quickhire/common';
import { body } from 'express-validator'
import { Conversation } from '../model/ConversationModel'
import { Chats } from '../model/ChatModel';

const router = express.Router();

router.post('/api/chats/saveChat',requireAuth,[
    body('content')
        .notEmpty()
        .withMessage("content can't be empty"),
    body('recipientId')
        .notEmpty()
        .withMessage("Reciever ID can't be empty"),
    validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    const { content, recipientId } = req.body;
    
    if(!req.currentUser){
        throw new NotAutherizedError();
    }

    let conversation;
    conversation = await Conversation.findOne({
        members: {
            $all: [recipientId, req.currentUser._id]
        }
    })

    if(!conversation){
        conversation = new Conversation({
            members: [recipientId, req.currentUser._id]
        });
        await conversation.save();
    }

    console.log('COnversation....',conversation)
    
    const newChat = new Chats({
        reciever:recipientId,
        sender:req.currentUser._id,
        content: content,
        contentType : 'text',
        conversation: conversation._id
    })
    
    await newChat.save();

    console.log(newChat);
    res.status(201).json({
        status:'success',
        chat:newChat
    });

}))

export {router as saveChatRouter}