const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        default:'https://media.istockphoto.com/id/1295274245/photo/random-multicolored-spheres-computer-generated-abstract-form-of-large-and-small-balls-3d.webp?b=1&s=170667a&w=0&k=20&c=On1rcMZtCPflzFJP6Wc2Y5GiRy0w0j1RA52FH-0EUX0='
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
const post=mongoose.model('post',postSchema)
module.exports=post;