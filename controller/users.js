const {response} = require('express');
const User = require('../model/user');

const getUsers = (req, res = response) => {
    res.json({
        msg: 'hello world'
    });
}

module.exports = {
    getUsers
}