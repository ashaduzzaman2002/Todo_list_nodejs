const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const flash = require('connect-flash')

const app = express();

const port = 5000

const todoRouter = require('./routes/todoRouter')
const userRouter = require('./routes/userRouter')

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(flash())

app.use('/', todoRouter)
app.use('/user', userRouter)




mongoose.connect("mongodb://localhost:27017/todo_nodejs", { useUnifiedTopology: true, useNewUrlParser: true});

app.listen(port,() => console.log(`http://localhost:${port}`));
