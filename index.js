const express = require('express')
const app = express();

const {config} = require('./config/config')
const moviesApi = require('./routes/movies')

const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

app.use(express.json())

moviesApi(app);
app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log('listenning at port', config.port)
})