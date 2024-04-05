require('dotenv').config()
const express=require('express');
const cors=require('cors')


const user=require('./models/user.model.js')
const { default: mongoose } = require('mongoose');
const userRouter=require('./routes/user.route.js');
const authRouter=require('./routes/auth.route.js');
const app=express();
app.use(cors())
app.use(express.json())

// Routes for the usese
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCodeode||500;
    const message=err.message||'Internal server Error'
    res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })
})




app.get('/',(req,res)=>{
    res.send("This is working fine")
})
    
app.listen(process.env.PORT,()=>{
    console.log(`Server is listinig in ${process.env.PORT}`)
    mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log(`connection sucess with the database`);
    }).catch((err)=>{
        console.log(`Error in the database connection : ${err}`);
    })
})