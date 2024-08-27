const { union } = require('lodash');
const mongoose =require('mongoose')

const bcrypt =require('bcrypt')

const personSchemna = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address :{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }
})

personSchemna.pre('save',async function(next){
    const person =this;

    if(!person.isModified('password') ) return next();
    //hash the password only if it's new or updated

    try{
        //hash password genrate 
        const salt =await bcrypt.genSalt(10);
        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password=hashedPassword
        next();
    }catch(error)
    {
        return next(err)
    }
})

personSchemna.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        next();
    }
});

personSchemna.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err)
    {
        throw err;
    }
}
                                          // name of the table
const Person =mongoose.model('Person',personSchemna,'person')
module.exports=Person;