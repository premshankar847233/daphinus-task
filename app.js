const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors')

app.use(express.json())
app.use(cookieParser())
//import all routes
const user = require('./routes/auth');
app.use('/api',user);
//adding middleware to handle errors
app.use(errorMiddleware)
module.exports = app