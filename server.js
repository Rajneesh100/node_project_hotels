const express = require('express')
const app = express() 
const db= require('./db')


app.use(express.json()); //same as body parser
// const bodyParser =require('body-parser')
// app.use(bodyParser.json());
const Menu =require('./models/menu')


 

app.get('/', function (req, res) {
  res.send('Welcome')
})


const personRoutes =require('./routes/personRoutes');
const menuRoutes =require('./routes/menuRoutes');
app.use('/menu',menuRoutes);
app.use('/person',personRoutes);
app.listen(3000,()=>{console.log("Server listing on port 3000")})