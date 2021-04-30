const express = require('express')
bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https');
const fs = require('fs');
config = require('./configs/prod') // dev
const { PORT } = config;

const app = express()
app.use(express.static(`${__dirname}/static`));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const routes = require('./routes')(app) // require routes

var key = fs.readFileSync(__dirname + '/certs/private.key');
var cert = fs.readFileSync(__dirname + '/certs/cert.crt');

var options = {
  key: key,
  cert: cert
};

var server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log("App starting on port: " + PORT)
});

// app.listen(PORT, () => console.log(`App listening at http://localhost:${port}`) )