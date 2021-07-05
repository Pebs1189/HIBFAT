const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();

    return bcryptjs.hashSync(password, salt);
}

const isValidPassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}

module.exports = {
    encryptPassword,
    isValidPassword
}