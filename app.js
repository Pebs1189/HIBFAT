//imports
const Server = require('./model/server');

// create the server
const server = new Server();

// listen by port 3000
server.listen();

// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('./certificates/key.pem'), 
//   cert: fs.readFileSync('./certificates/miCert.pem')
// };

// https.createServer(options, (req, res) => {
//     console.log(options);
// }).listen(8000);