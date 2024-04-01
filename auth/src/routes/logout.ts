import  express from 'express'
const router = express.Router();

router.get('/api/users/signout',(req,res)=>{
    res.status(200)
        .clearCookie('_accessToken')
        .clearCookie('_refreshToken')
        .json({
            status:'success',
            user:{}
        })
    
})
export { router as logoutRouter }