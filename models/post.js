const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
 userId:{
    type:String,
    required:true
 },
 description:{
    type:String,
    max:50
 },
 img:{
    type:String
 },
 likes:{
    type:Array,
    default:[]
 },
 
    
},
{ timestamps: true }
);

// yha me export kr rha hu schema ko use or auth k liye 
module.exports = mongoose.model("post", postSchema);