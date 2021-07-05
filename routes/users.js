//imports
const { Router } = require('express');
const { check } = require('express-validator');
const passport = require('passport');

const validarCampos = require('../middleware/validar-campos');
const { getUsers, addUser, getUserByID } = require('../controller/users');
const { existeEmail } = require('../helpers/db-validator');

//init router
const router = Router();

//get users
router.get('/', getUsers);

//get users by ID
router.get('/:id', [
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

//post login: validate sesion init of user
router.post('/login', 
    passport.authenticate('local', {failureRedirect:'/', successRedirect:'/users'})
);

//put user: update user data (the user logged must be the same user that we want to update data)

//delete user: delete registered user and his diet associated (put his state as false)

module.exports = router;