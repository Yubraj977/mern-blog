require('dotenv').config()
const user = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const errorHandler=require('../utils/error.js')
var jwt = require('jsonwebtoken');

const signup = async (req, res,next) => {
console.log(req.body)

    const { username, email, password } = req.body
    if (!username || !email || !password || username == ' ' || email == " " || password == '') {
       next(errorHandler(400,'All Fields are required'))
        
    }


    try {
        const hashpassword = await bcrypt.hash(password, 10,)
        const newuser = new user({ username, email, password:hashpassword })
        await newuser.save();
        res.json({ sucess:true, message: "Signup Sucess" })
    } catch (error) {

       next(error)
    }


}





const signin=async(req,res,next)=>{
   
console.log(req.body);
const {email, password } = req.body;
console.log(email)
console.log(password)
if ( !email || !password ||  email == " " || password == '') {
    next(errorHandler(400,'All Fields are required')) 
 }
  try {
    const validUser=await user.findOne({email})
   console.log(validUser)
    if(!validUser){
       return next(errorHandler(404,'user Not found'))
    }
    const validPassword=bcrypt.compareSync(password,validUser.password)
    
    if(!validPassword){
        next(errorHandler(400,"Invalid Password"))
    }



    if(validUser&&validPassword){
const token=jwt.sign({id:validUser._id,username:validUser.username},process.env.SECRET_KEY)
const userData={username:validUser.username, email:validUser.email,photo:validUser.photo}

res.status(200).cookie("access_token",token,).json({sucess:true,...userData})
    }




  } catch (error) {
    next(error)
  }

}




const googleSignIn=async(req,res,next)=>{
const {name,email,photo}=req.body
console.log(req.body)

try {
  const existUser=await user.findOne({email});
  console.log(existUser)
  if(existUser){
    const token=jwt.sign({id:existUser._id},process.env.SECRET_KEY)
    const userData={username:existUser.username,email:existUser.email,photo:existUser.photo}
    res.status(200).cookie("access_token",token,{httpOnly:true}).json({sucess:true,...userData})
  }
  else{
    const generatedPassword=Math.random().toString(36).slice(-8)
    const hashedPassword=await bcrypt.hash(generatedPassword,10)
    const newUser=new user( {
      username: name.toLowerCase().split(' ').join('') + Math.random().toString(36).substr(2, 4),
      email:email,
      password:hashedPassword,
      photo:photo
    })
    await newUser.save();
    const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY)
    const {password,...rest}=newUser.toObject();
    res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
  } 
} catch (error) {
  next(error)
}
}
module.exports = { signup,signin,googleSignIn };
