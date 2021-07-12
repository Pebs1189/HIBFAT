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

//Using crypto-js to encrypt objects
const objectEncryption = ( obj ) => {
    const objectEncrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), secret_key).toString();

    return objectEncrypted;
}

//Using crypto-js to decrypt objects
const objectDecryption = (encryptedObj) => {
    const bytes = CryptoJS.AES.decrypt(encryptedObj, secret_key);
    const decryptedObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedObj;
}

module.exports = {
    encryptPassword,
    isValidPassword,
    encryptPlainText,
    decryptPlainTextEncrypted,
    objectDecryption,
    objectEncryption
}