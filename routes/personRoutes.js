const express = require('express')
const router = express.Router()
const Person =require('./../models/person')

const {jwtAuthMiddleWare,genrateToken}= require('./../jwt.js');

// this is for pull

router.post('/signup',async (req,res)=>{
        try{
            const data =req.body;
            const newPerson= new Person(data)
            const response = await newPerson.save();
            console.log("data saved");
            const payload ={
                id :response.id,
                username: response.username,
                email:response.email                
            }
            const token = genrateToken(payload)
            console.log("token genrated :", token);
            res.status(200).json({response:response , token:token})
              

        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal sever Error'});
            
        }
})
//comment added for testing
//this is for checking update status after editing



router.get('/profile', jwtAuthMiddleWare,async (req,res)=>{
    
    try{
        console.log("in profile")
        // const userData = req.jwtPayload;// if userdata is not passed as object like 
                    // const genrateToken =(userData)=>{
                    //     // this user data should be proper object other wise expiry may not work
                    //     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:300000})
                    // }
        const userData =req.jwtPayload.userData  // when userData is passed as object like 
                                                // return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:300000})



        console.log("userData :",userData);
        const userID =userData.id
        const user =await Person.findById(userID)

        res.status(200).json({user});

        
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }

})

router.post('/login', async (req,res)=>{
    try{
        const{username, password} = req.body;
        const user =await Person.findOne({username :username });

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid user name or password"});

        }

        const payload={
            id:user.id,
            username:user.username,
            email:user.email
        }
        const token = genrateToken(payload)
        return res.json({token})
          
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})

    }
             
})


router.get('/', jwtAuthMiddleWare,async (req,res)=>{
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




// this is same as '/'
// router.get('/profile', jwtAuthMiddleWare,async (req,res)=>{
//     try{
//         const user = req.user
//         console.log(user)
//         const data =await Person.find();
//         console.log('person data fetched');
//         res.status(200).json(data);
//     }catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })
module.exports=router
