//imports
const {Schema, model} = require('mongoose');

//user model
const UserSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'] 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//Quita del esquema el password y la versión
UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...usuario} = this.toObject();
    return {uid: _id, ...usuario };
}

module.exports = model( 'User', UserSchema );