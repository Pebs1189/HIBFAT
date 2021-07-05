//imports
const { Router } = require('express');
const { check } = require('express-validator');
const { addDietByDay } = require('../controller/dietByDay');

const validarCampos = require('../middleware/validar-campos');

//init router
const router = Router();

//get all dietbyday
router.get('/', (req, resp)=> resp.json({msg:'get all dietbyday'}));

//get dietbyday by ID
router.get('/:id',  (req, resp)=> resp.json({msg:'get dietbyday by id'}) );

//post dietbyday: create a new dietbyday associated to an registered user
router.post('/', addDietByDay);

//put dietbyday: update dietbyday data  

//delete dietbyday: delete a dietbyday of a registered user

module.exports = router;