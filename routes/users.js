//imports
const { Router } = require('express');
const { check } = require('express-validator');
const {getUsers, addUser, getUserByID} = require('../controller/users');

//init router
const router = Router();

//get users
router.get('/', getUsers);

//get users by ID
router.get('/:id', getUserByID);

//post user
router.post('/', addUser);

module.exports = router;