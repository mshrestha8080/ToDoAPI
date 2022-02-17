//ToDo API index file
//Importing all required modulesS
const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');

//Import Routes
const postsRoute = require('./router/posts');

// //Middleware
app.use(bodyParser.json());
app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('We are on Home');
});

//Listening to the server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));