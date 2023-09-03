const user = require("../models/user");

const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../models/user.js")


router.get("/", (req, res) => {
    res.status(200).send("hello this is user page")

})

// update the user 
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            })
            res.status(200).json(" your account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("you can only edit  your account")
    }
})



// deleting account 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(" your account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("you can only delete  your account")
    }
})

// get user 
router.get("/:id", async(req,res)=>{
   try {
    const user = await User.findById(req.params.id);
    // mujhe paswrd showew nhi krwana to spread operator ka use krna ha
    const {password, updatedAt,...others} = user._doc
    res.status(200).json(others)
   } catch (error) {
    res.status(404).json("some error occurs", + error)
   }

})


// follow user 
router.put("/:id/follow", async(req, res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
           if(!user.followers.includes(req.body.userId)){
            await user.updateOne( { $push:{followers:req.body.userId } });
            await currentUser.updateOne({$push:{following:req.params.id} } );
            res.status(200).json("user has been followed")

           }
           else{
            res.status(403).json("you already followed this user ")
           }
        } 
     
        catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status.json("you can not follow your self ")
    }
})


//unfollow user 
router.put("/:id/unfollow", async(req, res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
           if(user.followers.includes(req.body.userId)){
            await user.updateOne( { $pull:{followers:req.body.userId } });
            await currentUser.updateOne({$pull:{following:req.params.id} } );
            res.status(200).json("user has been unfollowed")

           }
           else{
            res.status(403).json("you already unfollowed this user ")
           }
        } 
     
        catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status.json("you can not unfollow your self ")
    }
})

// ye route ko me yha se export kr rha hu 
module.exports = router