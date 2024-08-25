const { union } = require('lodash');
const mongoose =require('mongoose')



const menuschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','salty'],
        required:true
    }

})


const menu =mongoose.model('menu', menuschema, 'menu')

module.exports=menu;
