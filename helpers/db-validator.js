//imports
const User = require('../model/user');

//verificar si el correo existe: express-validator
const existeEmail =  async (correo  = '') => {
    const existe = await User.findOne({ correo });
    if (existe) throw new Error(`El correo ${correo} ya está registrado`);
};   

//exports
module.exports = {
    existeEmail
}