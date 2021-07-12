const bcryptjs = require('bcryptjs');
const CryptoJS = require('crypto-js');

require('dotenv').config({path:'./.env'});

const secret_key = process.env.SECRET_KEY;
const secret_key2 = process.env.SECRET_KEY2;

//using bcryptjs to encrypt user password
const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();

    return bcryptjs.hashSync(password, salt);
}

//using bcryptjs to compare if password is correct
const isValidPassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}

//using crypto-js to encrypt plain text
const encryptPlainText = (text = '') => {
    const textEncrypted = CryptoJS.AES.encrypt(text, secret_key2).toString();

    return textEncrypted;
}

//using crypto-js to decrypt plain text encrypted before
const decryptPlainTextEncrypted = (textEncrypted) => {
    const bytes = CryptoJS.AES.decrypt(textEncrypted, secret_key2);
    const textOriginal = bytes.toString(CryptoJS.enc.Utf8);  

    return textOriginal;
}

module.exports = {
    encryptPassword,
    isValidPassword,
    encryptPlainText,
    decryptPlainTextEncrypted
}