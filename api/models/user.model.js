const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCXeOmlMsGudPsHgyICRNJeQJ5FfMsw_K3ub6gMFZTAA&s'
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
const user=mongoose.model('user',userSchema)
module.exports=user;