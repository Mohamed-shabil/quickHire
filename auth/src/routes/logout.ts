import  express from 'express'
const router = express.Router();

router.post('/api/users/signout',(req,res)=>{
    res.clearCookie('jwt');
    res.send({})
})
export { router as logoutRouter }