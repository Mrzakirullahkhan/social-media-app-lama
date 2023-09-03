const router = require("express").Router();
const Post  = require("../models/post");
const User = require("../models/user.js")




// create post 
router.post("/create", async (req,res)=>{
    const newPost = new Post(req.body)
    try {
       const  savePost = await newPost.save();
       res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update post
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId=== req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json(" your post updated")
        }else{
            res.status(403).json("you can update only your own post ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
})

// delete post
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId=== req.body.userId){
            await post.deleteOne();
            res.status(200).json(" your post has been  deleted")
        }else{
            res.status(403).json("you can  only delete  your own post ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
})

// like post 

router.put("/:id/like",async(req,res)=>{
    const post = await Post.findById(req.params.id)
    try {
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("the post has been liked ")
        }
        else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("the post has been disliked ")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// get post 
router.get("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// timline posts 
router.get("/timline", async(req,res)=>{
    const postArray = [];
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId:currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendspost)=>{

                return Post.find({userId: freindId})
            })
        );
        res.json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router