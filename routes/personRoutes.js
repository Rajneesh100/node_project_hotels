const express = require('express')
const router = express.Router()
const Person =require('./../models/person')



router.post('/',async (req,res)=>{
    
        // const data =req.body;
        // const newPerson= new Person(data)
        /*
        //save function no longer accepts callback
        //save the person details in db
        newPerson.save((error, savedPerson)=>{
            if(error){
                console.log('error in saving person: ,',error)
                res.status(500).json({error:'Internal server error'})
            }else
            {
                console.log("person saved")
                res.status(200).json(savedPerson)
            }
        })

        */

        try{
            const data =req.body;
            const newPerson= new Person(data)
            const response = await newPerson.save();
            console.log("data saved");
            res.status(200).json(response)


        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal sever Error'});
            
        }
})
//comment added for testing

router.get('/', async (req,res)=>{
    try{
        const data =await Person.find();
        console.log('person data fetched');
        res.status(200).json(data);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})
router.get('/:workType', async (req,res)=>{
    try{
        const workType= req.params.workType;
        if(workType=='chef'||workType=='waiter'||workType=='manager')
        {
            const data=await Person.find({work: workType})
            res.status(200).json(data)      
        }else{
            res.status(404).json({error:'Profession NOT Found'})
        }

    }catch(err)
    {
        console.log(err);    
        // this error (not err) is just we send as a json 
        // the err is actual error
        res.status(500).json({error:'Internal server Error'});
        
    }
})


router.put('/:id', async (req , res)=> {
    try{
        const personId =req.params.id;
        const updatePersonData =req.body;

        const response= await Person.findByIdAndUpdate(personId,updatePersonData, {
            new:true, // return the updated document
            runValidators:true,// check that all the criteria of unique values and others are full filled
        }) 
        if(!response)
        {
            return res.status(404).json({error:"Person not found"})
        }

        console.log('data updated');
        res.status(200).json(response)
    }catch(error)
    {
        console.log("got error in put request:",error)
        res.status(500).json({error:"Internal server Error"})

    }
})

router.delete('/:id',async (req, res)=>{
    try{
        const personId=req.params.id
        const response = await Person.findByIdAndDelete(personId)
        if(!response)
        {
            return res.status(404).json({error:"Person not found"})
        }
        console.log("Person deleted")
        res.status(200).json({message:"Person deleted sucessfully"})

    }catch(err)
    {
        console.log("got error in delete request :",err)
        res.status(500).json({error:"Tnternal Server Error"})

    }
})
module.exports=router