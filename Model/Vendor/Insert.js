/**
 * Created by macbookpro on 18/06/2017.
 */

function Insert () {

}

Insert.prototype = {
    insertUser : function (user) {
        const User = require('../Beans/User');

            var MongoClient = require('mongodb').MongoClient;

            MongoClient.connect("mongodb://localhost:27017/Battleship", function(err, db) {
                if (!err) {
                    var collection = db.collection('user');

                    var doc1 = {username: user.getUserName(), password: user.getPassword(), email: user.getEmail()};
                    collection.insert(doc1);

                }
            });

    }
}



module.exports = Insert;