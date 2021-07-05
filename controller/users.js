//imports
const {response} = require('express');

const User = require('../model/user');
const { encryptPassword } = require('../helpers/passwordUtils');

//GET users paginado (5 max)
const getUsers = async (req, res = response) => {
    const {limit=10, desde=0} = req.query;
    const query = {estado:true};
   
    //paginación de resultados, se usa Promise.all para mejorar el rendimiento
    try {
        const resp = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .limit(Number(limit))
                .skip(Number(desde))
        ]);
    
        //destructuración de arreglos
        const [total, users] = resp;
    
        res.json({
            total,
            users
        });
    } catch (error) {
        res.status(400).json({msg:error});
    }
}

//GET user by id
const getUserByID = async (req, res = response) => {
    const {id} = req.params;

    try {
        //busca al usuario por ID
        const user = await User.findById(id);
    
        res.json(
            user
        );
    } catch (error) {
        res.status(400).json({msg:error});
    }
}

//POST user
const addUser = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol});
    
    //encript password
    user.password = encryptPassword(password);

    try {
        //save user in mongoDB
        await user.save();

        //response to request - OK
        res.json(
            user
        );
    } catch (error) {
        //response request - error
        res.status(400).json({msg:error});
    }
}

//exports
module.exports = {
    getUsers,
    addUser,
    getUserByID
}