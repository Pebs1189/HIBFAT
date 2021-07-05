const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();

    return bcryptjs.hashSync(password, salt);
}

const isValidPassword = (password, hash) => {
    const res = bcryptjs.compareSync(password, hash)

    return res;
}

module.exports = {
    encryptPassword,
    isValidPassword
}