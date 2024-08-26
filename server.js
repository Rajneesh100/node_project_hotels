const express = require('express')
const app = express() 
const db= require('./db')
require('dotenv').config()
const PORT =process.env.PORT ||3000

app.use(express.json()); //same as body parser
// const bodyParser =require('body-parser')
// app.use(bodyParser.json());
const Menu =require('./models/menu')



// middleware function

const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();// this signals the current middle ware function 
}

//apply log in to all points
app.use(logRequest)

// app.get('/',logRequest, function (req, res) {  // this will apply log in to only home page '/'
app.get('/',logRequest, function (req, res) {
  res.send('Welcome')
})



const personRoutes =require('./routes/personRoutes');
const menuRoutes =require('./routes/menuRoutes');
app.use('/menu',menuRoutes);
app.use('/person',personRoutes);
app.listen(PORT,()=>{console.log("Server listing on port 3000")})