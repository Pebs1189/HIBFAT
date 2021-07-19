//imports
const { Router } = require('express');
const { check } = require('express-validator');
const passport = require('passport');

const validarCampos = require('../middleware/validar-campos');
const { getUsers, addUser, getUserByID, logoutUser } = require('../controller/users');
const { existeEmail } = require('../helpers/db-validator');

//init router
const router = Router();

//get users
router.get('/all', getUsers);

//get users by ID
router.get('/byID/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], getUserByID);

//post register: create a new user
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( existeEmail ),
    check('password', 'El password debe tener más de 5 letras').isLength({min:6}), 
    validarCampos
], addUser);

//helpers
router.get('/failed-login', (req, res) => res.send('You Failed to log in!'));
router.get('/success-login', (req, res) => res.send(`Welcome ${req.user.correo} and thanks to log in!`));
router.get('/privacity', (req, res) => res.send(`Welcome to privacity!`));
router.get('/fb_data_del', (req, res) => res.send(`Welcome to delete your facebook data in our databases!`));

//post login with local: validate sesion init of user
router.post('/login', 
    passport.authenticate('local', {failureRedirect:'/user/failed-login', successRedirect:'/user/success-login'})
);

//post login with google: validate sesion init of user
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/login-google', 
    passport.authenticate('google', { failureRedirect: '/user/failed-login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/user/success-login');
    }
);

//post login with facebook: validate sesion init of user
router.get('/facebook', 
    passport.authenticate('facebook')
);

router.get('/login-facebook', 
    passport.authenticate('facebook', { failureRedirect: '/user/failed-login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/user/success-login');
    }
);
//user logout
router.get('/logout', logoutUser);

//put user: update user data (the user logged must be the same user that we want to update data)

//delete user: delete registered user and his diet associated (put his state as false)

module.exports = router;