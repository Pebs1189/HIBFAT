//imports
const Server = require('./model/server');
//configs
require('dotenv').config({path:'./.env'});

// create the server
const server = new Server();

//listen by port 3000
server.listen();