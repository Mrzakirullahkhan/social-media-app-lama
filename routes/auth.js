const router = require("express").Router();
const bcrypt = require("bcrypt");

// yha me us schema ko bula rha hu 
const User = require("../models/user")


router.post("/resgisture", async(req, res)=>{
   

     try {

        // generating new paswrd 
        const salt = await bcrypt.genSalt(10);
        const hashedpasward = await bcrypt.hash(req.body.password, salt);

        // creating the new user 
        const newUser =  await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpasward,
    
        })
        const user = await newUser.save();
        // point wali bath hai ye user json me value de rha to me ye krungy
        res.status(200).json(user);

     } catch (error) {

        res.status(500).json(error)
     }    
})

// this is for user login 

router.post("/login", async(req,res)=>{
    try {
// ab yha User k sath new nhi aega q k yha already check kia ja rha hai 
        const user = await  User.findOne({email:req.body.email})
        !user && res.status(404).json("your email is wrong ")
        
// for password checking 
        const validPassword= await bcrypt.compare(req.body.password, user.password)
        // !validPassword && res.status(400).json("your password is wrong")
        !validPassword && res.status(400).json("your password is wrong ")
    

// agr email paswrd dono sahi hai jab user pass krdengy 

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})





// ye route ko me yha se export kr rha hu 
module.exports = router