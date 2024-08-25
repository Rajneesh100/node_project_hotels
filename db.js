const mongoose= require('mongoose')

const mongoUrl='mongodb://localhost:27017/restra'

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology :true
})

const db= mongoose.connection;

db.on('connected',()=>{
    console.log("MongoDB database connected \n")
})

db.on('error',(err)=>{
    console.log("error in connecting MongoDB database :", err)
})


db.on('disconnected',()=>{
    console.log("MongoDB database Disconnected \n")
})

module.exports =db;
