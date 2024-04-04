import express,{Request,Response} from 'express';
import { requireAuth, catchAsync, NotAutherizedError, BadRequestError } from '@quickhire/common'
import { User } from '../model/user';
import bcrypt from 'bcryptjs'
import { body } from 'express-validator';
import { cookieOption, createAccessToken } from '../utils/Token';
const router = express.Router();

router.post('/api/auth/admin/login',[
    body('name')
        .notEmpty()
        .withMessage("username dcan't be empty"),
    body('password')
        .notEmpty()
        .withMessage("Passwords can't be empty")
],catchAsync(async(req:Request,res:Response)=>{
    const {name, password} = req.body;
    
    const admin = await User.findOne({name:name});

    if(!admin?.password || !admin){
        console.log('pasword is not here ')
        throw new BadRequestError("Username or password is incorrect");
    }
    
    const matchPassword = await bcrypt.compare(password,admin.password);
    
    if(!matchPassword){
        console.log('mis match password')
        throw new BadRequestError("Username or password is incorrect");
    }
    const payload = {
        _id:admin._id.toString(),
        email:admin.email,
        name:admin.name,
        ...(admin.phone &&{phone:admin.phone}),
        verified:admin.verified,
        isBlocked:admin.isBlocked,
        role:admin.role
    }
    const jwt = createAccessToken(payload);
    console.log('TOKen -',jwt);
    res.cookie('jwt',jwt);
    res.status(200).json({
        status:'success',
        admin:{
            ...payload,
            token:jwt
        }
    })
}))

export { router as adminLoginRoute }