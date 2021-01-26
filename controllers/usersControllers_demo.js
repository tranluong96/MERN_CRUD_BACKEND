const UserDB = require('../models/user');

exports.getUserForm = (req, res, next) => {
    UserDB.findAll()
        .then(Users => {
            res.render('../views/components/users', {content: 'list-user', name : 'lượm', title: 'User Page', UserLists : Users});
        })
        .catch(err => console.log('Pull data failed...'));
    
};

exports.addUserForm = (req, res, next) => {
    res.render('../views/components/users', {content: 'add-user', name : 'lượm', title: 'Add User'});
};

exports.saveUserForm = (req, res, next) => {
    const firstname = req.body.InputFirstName;
    const lastName = req.body.InputLastName;
    const email = req.body.InputEmail;
    const password = req.body.InputPassword;
    const passConfirm = req.body.InputPassword_Confirm;

    const Userlist = new UserDB(null, firstname, lastName, email, password, passConfirm);
    Userlist.save();
    
    res.redirect('/profile-user');
};

exports.detailUserForm = (req, res, next) => {
    UserDB.detailUser(req.params.id)
        .then(Detail => {
            res.render('../views/components/users', {content: 'detail-user', name : 'lượm', title: 'User detail', userDetail : Detail});
        })
        .catch(err => console.log(err));
};

exports.editUser = (req, res, next) => {
    UserDB.editUser(req.params.id)
        .then(editUser => {
            res.render('../views/components/users', { content: 'edit-user', name: editUser.firstname, title: 'edit user', userDetail: editUser } );
        })
        .catch(err => console.log(err));
}

exports.editUserPost = (req, res, next) => {
    const editUser = new UserDB(req.body.id, req.body.InputFirstName, req.body.InputLastName, req.body.InputEmail, req.body.InputPassword , req.body.InputPassword_Confirm);
    editUser.updateUser()
        .then( result => {
            // console.log(editUser._id);
            res.redirect('/profile-user/detail-user/'+editUser._id);
        })
        .catch( err => console.log(err));
}

exports.deleteUser = (req, res, next) => {
    UserDB.deleteFindid(req.body.id);
    res.redirect('/profile-user');

}

