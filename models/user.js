const Userlist_arr = [];
const getDB = require('../utils/mongodb').getDB;
const objectId = require('mongodb').ObjectID;

class User{

    constructor(id, firstName, lastName, email, password, passConfirm){
        this._id         = id;
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.email      = email;
        this.password   = password;
        this.passConfirm= passConfirm;
    }

    save(){
        // this.id = Math.floor(Math.random() * 100000);
        // Userlist_arr.push(this);
        const db = getDB();
        db.collection('users')
        .insertOne(this)
        .then(result => {
            console.log(result.result);
        })
        .catch( err => console.log(err));
    }

    static findAll(){
        const db = getDB();
        return db.collection('users')
            .find()
            .toArray()
    }

    static detailUser(id){
        const db = getDB();
        return  db.collection('users')
                            .findOne({_id : new objectId(id)});
        // return Userlist_arr.filter(p =>  p.i_d == id);
    }

    static editUser(id){
        const db = getDB();
        return db.collection('users')
                    .findOne({_id : new objectId(id)});
    }

    updateUser(){
        const db = getDB();
        return db.collection('users')
            .updateOne({ _id : new objectId(this._id) } , { 
                $set : {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    passConfirm: this.passConfirm
                }
            });

        // const updateUserindex = Userlist_arr.findIndex(p => p.id == this.id);
        // Userlist_arr[updateUserindex] = this;
    }

    static deleteFindid(id){
        const deleteUser = Userlist_arr.findIndex(p => p.id == id);
        Userlist_arr.splice(deleteUser, 1);
    }

}
module.exports = User;
