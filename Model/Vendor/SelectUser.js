/**
 * Created by macbookpro on 19/06/2017.
 */

var sleep = require('system-sleep');

function SelectUser () {

}

SelectUser.prototype = {
    selectUser : function (user) {
        var retur;
        const User = require('../Beans/User');
        var user2 = new User();

        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect("mongodb://localhost:27017/Battleship", function(err, db) {
            if (!err) {



                db.collection('user').findOne({ $and : [ {"email":user.getEmail()}, {"password": user.getPassword() } ] }, function(err, document) {
                    user2.setPassword(document.password);
                    user2.setEmail(document.email);
                    user2.setUserName(document.username);


                });

            }
        });

        var sleep = require('system-sleep');
        sleep(200);

        return user2;
    }
}



module.exports = SelectUser;