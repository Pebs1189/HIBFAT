//imports
const express = require('express');
const {dbConnection} = require('../database/bda_config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            dietByDay: 'user/dietByDay',
            dietByWeek: 'user/dietByWeek',
            users: 'users'
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
    }

    listen() {
        //open port and listen requests
        this.app.listen(this.port, () => console.log(`Server listening in port ${this.port}`));
    }

    middlewares() {
        //Read and Parse to body with JSON
        this.app.use(express.json());
    }
}

module.exports = Server;