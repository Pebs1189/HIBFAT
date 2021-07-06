const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

//custom fields needed to use google strategy in passport.js
const customsFields = {  
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: "/login-google/callback"
};

//search if google user was looged before if not then user is created in DB
const verifyCallBack = (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
}

//Google strategy complete
const strategy = new GoogleStrategy(customsFields, verifyCallBack);

//export strategy
module.exports = function(passport) {   
    passport.use( strategy );
}
