const express=require('express');
const {createPost,getPosts,deletePost,updatePost}=require('../controllers/post.controller')
const {verifyToken}=require('../utils/verifyUser')

const router=express.Router()
router.post('/create',verifyToken,createPost)
router.get('/getposts',getPosts)
router.delete('/delete/:postId',verifyToken,deletePost)
router.put('/update/:postId',verifyToken,updatePost)
module.exports=router;