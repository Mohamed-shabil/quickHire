import  express from 'express'
const router = express.Router();

router.get('/api/users/signout',(req,res)=>{
    res.clearCookie('jwt');
    res.status(200).json({});
    
})
export { router as logoutRouter }