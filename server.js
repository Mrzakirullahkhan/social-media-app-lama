const express = require("express");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
// const helmet = require("helmet");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();



// my midware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// yha midware ka kaam krta hu me 
app.use("/apis/user", userRoute)
app.use("/apis/user/auth", authRoute)
app.use("/apis/user/post", postRoute)


const connectDb = (uri) => {
    console.log("Connect Database")
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


const start = async () => {
    try {

        app.listen(PORT, async () => {
            await connectDb(process.env.DATABASE_URL)
            console.log("Server is working")
        
        })
    } catch (error) {

        console.log(error)
    }
}
start()



app.get("/abcd",(req,res)=>{
    res.status(200).send("hello worlds  ")
   })
