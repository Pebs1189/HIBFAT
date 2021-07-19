//imports
const express = require('express');
const session = require('express-session');
const passport = require('passport');

//configs
require('dotenv').config({path:'./.env'});

//import and use the local strategy selected to Passport
require('../config/passport-local')(passport);

//import and use google strategy selected to Passport
require('../config/passport-google')(passport);

//import and use facebook strategy selected to Passport
require('../config/passport-facebook')(passport);

const {dbConnection} = require('../database/bda_config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.secret = process.env.SECRET_KEY;

        //testing an react APP
        this.app.use(express.static('public'));

        this.paths = {
            dietByDay: '/user/dietByDay',
            dietByWeek: '/user/dietByWeek',
            users: '/user',
        };
    
        //connect BDs
        this.connectDBs();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDBs() {
        //realize db connection
        await dbConnection();
    }

    routes() {
        //config endpoints
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.dietByDay, require('../routes/dietByDay'));
    }

    listen() {
        //open port and listen requests
        this.app.listen(this.port, () => console.log(`Server listening in port ${this.port}`));
    }

    middlewares() {
        //Read and Parse to body with JSON
        this.app.use(express.json());

        //configure session 
        this.app.use(session({
            secret: `${this.secret}`,
            resave: true,
            saveUninitialized: true
        }));
        
        //init passport and session
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}

module.exports = Server;