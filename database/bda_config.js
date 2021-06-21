//imports
const mongoose = require('mongoose');

//connect to mongoDB compass - atlas
const dbConnection = async () => {
    try {
        //use CDN from dotenv
        const mongoCDN = process.env.MONGODB_CDN;

        //configs to connect to Mongodb
        await mongoose.connect(mongoCDN, { 
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            family: 4
        });

        console.log('DBA online');

    } catch (error) {
        throw new Error('Error al inicializar la DB:', error);
    }
}

module.exports = {
    dbConnection
}