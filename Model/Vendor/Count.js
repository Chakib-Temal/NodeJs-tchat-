var sleep = require('system-sleep');

function Count () {

}

Count.prototype = {
    countUser: function (user) {
    var test = true;


        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect("mongodb://localhost:27017/Battleship", function(err, db) {
            if (!err) {
                db.collection('user').find({"email":user.getEmail()}).count()
                    .then(function(numItems) {


                        if(numItems > 0){
                            test = false;
                        }
                    })
            }
        });

        var sleep = require('system-sleep');
        sleep(200);
        return test;
    },

    countUserForLogin: function(user) {
        var test = false;
        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect("mongodb://localhost:27017/Battleship", function(err, db) {
            if (!err) {
                db.collection('user').find( { $and : [ {"email":user.getEmail()}, {"password": user.getPassword() } ] }).count()
                    .then(function(numItems) {

                        if(numItems > 0){
                            test = true;

                        }
                    })
            }
        });

        var sleep = require('system-sleep');
        sleep(200);

        return test;
    }
};



module.exports = Count;