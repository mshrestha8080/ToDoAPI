//ToDo API index file

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./router/posts');

//Middleware
app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('We are on Home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => console.log('connected to DB!'));


//Listening to the server
app.listen(4000);