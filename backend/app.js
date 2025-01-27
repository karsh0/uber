const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
const router = require('./routes/user');
const cookieParser = require('cookie-parser')
const ConnectToDb = require('./db/db');
dotenv.config()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
ConnectToDb()

app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/user', router)

module.exports = app;