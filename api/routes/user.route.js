const express=require('express')
const {updateuser,deleteUser,signOut}=require('../controllers/user.controller')
const {verifyToken}=require('../utils/verifyUser')

const router=express.Router();
router.put('/update/:userId', verifyToken, updateuser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signOut)
module.exports=router;