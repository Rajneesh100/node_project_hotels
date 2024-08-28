

const LocalStrategy =require('passport-local').Strategy;
const passport = require('passport');
const Person =require('./models/person')

//done(error , user , info)
passport.use(new LocalStrategy(async (UserName , password, done)=>{
    try{
        console.log("recieved credemtials: ", UserName, password);
        const user = await Person.findOne({username:UserName})
        if(!user)
          return done(null,false, {message :'incorrect username :('})
        const pwd= user.password;
  
        // const isPasswordMatch = user.password==password ?true:false;
        const isPasswordMatch = await user.comparePassword(password);  // check the person.js for comparePassword function

        // if(pwd==password)
        if(isPasswordMatch)
        {
          return done(null,user);
        }else 
        {
          return done(null, false, {message:'incorrect Password :('})
        }
    }catch(err)
    {
      return done(err)
    }
}))
module.exports=passport




// // correct authentication implimented
// const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
// const Person = require('./models/person');

// // Customize the strategy to use query parameters instead of body parameters
// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true // This allows us to access `req` in the callback
// }, async (req, UserName, password, done) => {
//     try {
//         // Use req.query instead of the parameters from the request body
//         const userNameFromQuery = req.query.username;
//         const passwordFromQuery = req.query.password;

//         // If the credentials were found in req.query, use them; otherwise, fall back to body
//         const user = await Person.findOne({ username: userNameFromQuery || UserName });
//         if (!user) {
//             return done(null, false, { message: 'Incorrect username :(' });
//         }

//         const isPasswordMatch = await user.comparePassword(passwordFromQuery || password);

//         if (isPasswordMatch) {
//             return done(null, user);
//         } else {
//             return done(null, false, { message: 'Incorrect Password :(' });
//         }
//     } catch (err) {
//         return done(err);
//     }
// }));

// module.exports = passport;
