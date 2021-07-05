//imports
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('../config/passport')(passport);

const {dbConnection} = require('../database/bda_config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.secret = process.env.SECRET_KEY;

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
        await dbConnection();
    }

    routes() {
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

        this.app.use(session({
            secret: `${this.secret}`,
            resave: true,
            saveUninitialized: true
        }));
        
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}

module.exports = Server;