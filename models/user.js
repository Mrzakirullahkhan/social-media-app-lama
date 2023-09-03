const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // yha properties aengi ..
    username:{
        type:String,
        required:true,
        min:5,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:40,
        
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20,
    },
    profilePicture:{
        type:String,
        default:""
    },
    descrition:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50,
    },
    relation:{
        type:Number,
        enum:[1,2,3]

    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},
{ timestamps: true }
);

// yha me export kr rha hu schema ko use or auth k liye 
module.exports = mongoose.model("user", userSchema);