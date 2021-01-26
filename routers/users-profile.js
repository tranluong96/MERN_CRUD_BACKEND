const express   = require('express');
const user      = express.Router();
const path      = require('path');
const bodyParser= require('body-parser');


const UserControllers = require('../controllers/usersControllers_demo');
const User = require('../models/user');
// get data from body , res.body 
user.use(bodyParser.urlencoded({ extended : true }));

user.all('/', UserControllers.getUserForm);
user.get('/addUser', UserControllers.addUserForm);
user.post('/addUser', UserControllers.saveUserForm );
user.get('/detail-user/:id',UserControllers.detailUserForm);
user.get('/edit-user/:id', UserControllers.editUser);
user.post('/edit-user', UserControllers.editUserPost);
user.post('/delete-user', UserControllers.deleteUser);
module.exports = user;