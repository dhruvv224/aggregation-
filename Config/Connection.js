const mongoose=require('mongoose');
const express=require('express')
const app=express()
 const  ConnectDb=async()=>{
    try {
        const connection= await mongoose.connect("mongodb://localhost:27017/practice")
        console.log("connection successfully at ",connection.connection.host);
        
        
    } catch (error)
     {
        console.log("there is something wrong");
        
        
    }
}
module.exports =ConnectDb