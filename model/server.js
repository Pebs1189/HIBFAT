const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
    
        //connect BDs

        //Middlewares
        this.middlewares();

        //Routes
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server listening in port ${this.port}`));
    }

    middlewares() {
        //use cors
        this.app.use(cors());

        //Read and Parse to body with JSON
        this.app.use(express.json());
    }
}

module.exports = Server;