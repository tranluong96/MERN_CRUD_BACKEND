const express   = require('express');
const app       = express();
const path      = require('path');
const bodyParser= require('body-parser');
const UserRouter = require('./routers/users-profile');
const MongoConnect = require('./utils/mongodb').mongoConnect;


// run router have link /* first 
app.enable('case sensitive routing'); /* '/' => '/*' */
app.enable('etag');
app.set('env', 'deverlopment');
app.set('view engine', 'ejs');

// get data from body , res.body 
app.use(bodyParser.urlencoded({ extended : true }));
// public css js images in file public
app.use(express.static(__dirname + '/public'));

//middleware 
app.use((req, res, next) => {
        next();
});

//insert router Users
app.use('/profile-user', UserRouter);

// page Home and setting server 
app.all('/', (req, res, next) => {
        res.render('index', {name : 'lượm', title: 'Home Page'});
});
app.use((req, res, next) => {
        res.status(404).send('Page Not Found !');
});
app.use((req, res, next) => {
        res.status(500).send('Somethink Broke!');
});
// created server port 3000 , run first 
MongoConnect( () => {
        app.listen(3000, () => {
                console.log(`Server started on 3000`);
        });
});
