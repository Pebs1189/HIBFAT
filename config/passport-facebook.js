const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/user');
const {encryptPassword} = require('../helpers/passwordUtils');

//custom fields needed to use facebook strategy in passport.js
const customsFields = {  
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_ID,
    callbackURL: "http://localhost:3000/user/facebook"
};

//search if google user was looged before if not then user is created in DB
const verifyCallBack = async (accessToken, refreshToken, profile, done) => {
    // const {sub, name, email, picture} = profile._json;

    console.log(profile);

    // try {
    //     const user = await User.findOne({correo:email});
        
    //     if (!user) {
    //         const user = new User({
    //             nombre:name, 
    //             img:picture, 
    //             correo: email, 
    //             password: encryptPassword(sub), 
    //             rol:'FACEBOOK_USER'
    //         });
            
    //         user.save();

    //         return done(null, user);
    //     }
        
    //     return done(null, user);
    // } catch (error) {
    //     console.error(error);
    // }
}

//Google strategy complete
const strategy = new FacebookStrategy(customsFields, verifyCallBack);

//export strategy
module.exports = function(passport) {   
    passport.use( strategy );
}