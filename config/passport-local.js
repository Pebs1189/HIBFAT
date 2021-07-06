const LocalStrategy = require('passport-local').Strategy;

const {isValidPassword} = require('../helpers/passwordUtils');
const User = require('../model/user');

//fields to be used in LocalStrategy 
const customFields = {
    usernameField: 'correo',
    passwordField: 'password'
}

//Using user model we verify if the user was trying to login is registered
const verifyCallBack = (correo, password, done) => {
    User.findOne({correo})
        .then( user => {                     
            if(!user) return done(null, false, {message : 'that email is not registered'});
                        
            return isValidPassword(password, user.password) ? done(null, user) : done(null, false);
        })
        .catch(err => done(err));  
};

//merge the customfields and verifyCallBack as local strategy
const strategy = new LocalStrategy(customFields, verifyCallBack);

//export the strategy selected in passport
module.exports = function(passport)  {
    //use local strategy
    passport.use(strategy);

    //needed to session
    passport.serializeUser( (user, done) => {
        done(null, user);
    });
    
    //needed to session
    passport.deserializeUser((user, done) => {
        done(null, user);
    }); 
}