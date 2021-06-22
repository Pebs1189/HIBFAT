//imports
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, addUser, getUserByID } = require('../controller/users');
const validarCampos = require('../middleware/validar-campos');
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

//post user
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( existeEmail ),
    check('password', 'El password debe tener más de 5 letras').isLength({min:6}), 
    validarCampos
], addUser);

module.exports = router;