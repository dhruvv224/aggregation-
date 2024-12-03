const express=require('express')
const mongoose=require('mongoose')
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    
},{
    timestamps:true
})
const Items=mongoose.model('items model',itemSchema)
module.exports=Items