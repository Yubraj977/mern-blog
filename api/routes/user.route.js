const express=require('express')
const router=express.Router();
const {print}=require('../controllers/user.controller.js')
router.get('/hi',print)

module.exports=router;