const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

//Define routes
const apiRouter = require('./routes/api');
server.use('/', apiRouter);

//Start listening
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = server;