const jwt =require('jsonwebtoken')
const db= require('./db')


const jwtAuthMiddleWare=(req,res,next)=>{

    //first check that request header has authorization or not ? like some username ? passoword or token is passed or not
    const authorization =req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'});

    const token= req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});
    
    try{
        //verify the jwt token
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        //attach user information to the request object
        // req.user=decoded // below is also  same
        req.jwtPayload=decoded
        next();

    }catch(error){
        console.log("from jwt.js :",error)
        res.status(401).json({error:"Invalid Token"})
    }



}

const genrateToken =(userData)=>{
    // this user data should be proper object other wise expiry may not work
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:300000})
}
module.exports={jwtAuthMiddleWare,genrateToken};