//imports
const { Router } = require('express');
const { check } = require('express-validator');
const {getUsers} = require('../controller/users');

//init router
const router = Router();

//get users
router.get('/', getUsers);

module.exports = router;