const express = require('express')
const router = express.Router()
const Menu =require('./../models/menu')


 
router.get('/', async (req,res)=>{

    try{
        const data = await Menu.find()
        console.log("menu data fetched")
        res.status(200).json(data);

    }catch(err)
    {
        console.log("Error in fetching menu data :",err)
        res.status(500).json({err:'Internal Server error'})
    }
})




router.post('/', async (req,res)=>{
    try{
        const data = req.body;
        const addeditem = new Menu(data)
        const response = await addeditem.save()
        console.log("menu item added")
        res.status(200).json(response)
    }catch(err){
        console.log('Error in saving menu item:',err)
        res.status(500).json({err:'ENternal server error in saving item'})
    }

})

router.get('/:taste', async (req,res)=>{
    try{
        const taste= req.params.taste;
        if(taste=='sweet'||taste=='salty'||taste=='spicy')
        {
            const data=await Menu.find({taste: taste})
            res.status(200).json(data)      
        }else{
            res.status(404).json({error:'Taste NOT Found'})
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
        
    }
})


router.delete('/:id',async (req, res)=>{
    try{
        const itemId=req.params.id
        const response = await Menu.findByIdAndDelete(itemId)
        if(!response)
        {
            return res.status(404).json({error:"Item not found"})
        }
        console.log("Item deleted")
        res.status(200).json({message:"Item deleted sucessfully"})

    }catch(err)
    {
        console.log("got error in delete request of item :",err)
        res.status(500).json({error:"Tnternal Server Error"})

    }
})



router.put('/:id', async (req , res)=> {
    try{
        const itemId =req.params.id;
        const updateItemData =req.body;

        const response= await Menu.findByIdAndUpdate(itemId,updateItemData, {
            new:true, // return the updated document
            runValidators:true,// check that all the criteria of unique values and others are full filled
        }) 
        if(!response)
        {
            return res.status(404).json({error:"Item not found"})
        }

        console.log('item data updated');
        res.status(200).json(response)
    }catch(error)
    {
        console.log("got error in put request of Item :",error)
        res.status(500).json({error:"Internal server Error"})

    }
})

module.exports=router
