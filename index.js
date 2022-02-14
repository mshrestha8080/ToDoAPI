//ToDo API index file

//set up express app
const express = require('express');
const app = express();

//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ourdata');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());
//initialize routes
app.use('/api',require('./router/api'));

//error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function() {
    console.log('now listening for requests...');
});