const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000

const todoRouter = require('./routes/todoRouter')
const userRouter = require('./routes/userRouter')

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use('/', todoRouter)
app.use('/user', userRouter)




mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true});

app.listen(port,() => console.log(`http://localhost:${port}`));
