const mongoose= require('mongoose')

// const mongoUrl='mongodb://localhost:27017/restra'
const mongoUrl ='mongodb+srv://kumarrajneesh79258:or6UHwBQ70x5cUNj@cluster0.qxzeu.mongodb.net/'

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
