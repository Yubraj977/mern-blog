const errorHandler=require('../utils/error')
const post=require('../models/post.model')
async function createPost(req,res,next){
    const id=req.user.id
    const isAdmin=req.user.isAdmin;
    const {title,content,category,image}=req.body
    const slug=title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-')
  
   
    if(!isAdmin){
        return next(errorHandler(403,'you are not allowded to do that '))
    }
    if(!title || !content){
        return next(errorHandler(403,'plese provided all fields'))
    }
    const newPost=new post({
        userId:id,
        content:content,
        title:title,
        slug:slug,
        category:category,
        image:image

    })
    
    try {
        const savedPost=await newPost.save();
        console.log(savedPost)
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }


}
async function getPosts(req,res,next){
try {
     const startIndex=parseInt(req.query.startIndex)||0
     const limit=parseInt(req.query.limit) || 9
     const sortDirection=req.query.order=='asc'?1:-1;
     console.log(req.query.category)
     const posts = await post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
     const totalPosts=await post.countDocuments();
     const now=new Date();
     const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
     );
     const lastMonthposts=await post.countDocuments({
        createdAt:{$gte:oneMonthAgo},

     })
     res.status(200).json({
        posts,
        totalPosts,
        lastMonthposts}
     )
  
} catch (error) {
    next(error)
}
}
async function deletePost(req,res,next){
    const {postId}=req.params;
    try {
        const deletedPost=await post.findByIdAndDelete(postId);
        if(!deletedPost){
            next(errorHandler(401,'No posts found to delete'))

        }
        console.log(deletedPost)
        res.status(200).json(deletedPost)
    } catch (error) {
        next(error)
    }
}
async function updatePost(req,res,next){
const {postId}=req.params
console.log(req.body)
try {
  const updatePost=await post.findByIdAndUpdate(postId,{
        $set:{
            title:req.body.title,
            content:req.body.content,
            image:req.body.image,
            category:req.body.category,

        }
    },{new:true})
    res.status(200).json(updatePost)
} catch (error) {
    next(error)
}
}


module.exports={createPost,getPosts,deletePost,updatePost}