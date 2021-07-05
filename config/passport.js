const LocalStrategy = require('passport-local').Strategy;

const {isValidPassword} = require('../helpers/passwordUtils');
const User = require('../model/user');


const customFields = {
    usernameField: 'correo',
    passwordField: 'password'
}

const verifyCallBack = (correo, password, done) => {
    User.findOne({correo})
        .then( user =>{                     
            if(!user) return done(null,false,{message : 'that email is not registered'});
            
            const isValid = isValidPassword(password, user.password);
            
            return isValid ? done(null, user) : done(null, false);
        })
        .catch(err => done(err));  
};

const strategy = new LocalStrategy(customFields, verifyCallBack);


module.exports = function(passport)  {
    passport.use(strategy);

    passport.serializeUser( (user, done) => {
        done(null, user);
    });
      
    passport.deserializeUser((user, done) => {
        done(null, user);
    }); 
}