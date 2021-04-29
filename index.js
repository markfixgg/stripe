const express = require('express')
bodyParser = require('body-parser')
const cors = require('cors')
config = require('./configs/prod') // dev
const { port } = config;

const app = express()
app.use(express.static(`${__dirname}/static`));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const routes = require('./routes')(app) // require routes

app.listen(port, () => console.log(`App listening at http://localhost:${port}`) )