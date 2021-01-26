const MongoClient = require('mongodb').MongoClient;

let _db; //private
const mongoConnect = function(callback){
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
        .then(client => {
            _db = client.db('blog_demo');
            callback();
        })
        .catch(error => {
            console.log(error);
            throw New = Error('DB connnection failed...');
    });
} 

const getDB = () => {
    if(_db){
        return _db;
    }else{
        throw new Error('connection db failed...');
    }
}

exports.mongoConnect = mongoConnect; 
exports.getDB = getDB;