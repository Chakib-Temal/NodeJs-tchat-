var express        =         require("express");
var bodyParser     =         require("body-parser");
var session        =         require('express-session');

var url = require('url'); // generation des URL automatiquement en cas de changement de pc

var app            =         express(); // express

var server = app.listen(9999, function () {
    console.log('sever listen in port 9999');
}); // demarrer le serveur sur sur le port 9999

var io = require('socket.io').listen(server); // Utilisation des Sockets


app.use('/public', express.static(__dirname + '/public')); // Rendre le dossier public public

app.use(session({secret: 'ssshhhhh'})); // utilisation des sessions

// recuperation des parametres de la requete
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const User = require('./Model/Beans/user.js');
var sess;

function generateUrl(req) {
    var requrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });
    return requrl;
}

//Login :
app.get('/login',function(req,res){
    sess = req.session;


    if(sess.email){
        res.redirect(generateUrl(req)+'/chat');
    }else {
        res.render('login.html.twig');
    }
});

app.post('/login',function(req,res){
    sess = req.session;

    if(sess.email){

        res.redirect(generateUrl(req) +'/chat');
    }else {
        var user = new User();
        user.setEmail( req.body.email );
        user.setPassword( req.body.password );

        const Count = require('./Model/Vendor/Count');
        var countUser = new Count();
        var test = countUser.countUserForLogin(user);


        if (test){
            var select = require('./Model/Vendor/SelectUser');
            var selectUser = new select();
            var userJson = selectUser.selectUser(user);
            sess.username = userJson.getUserName();
            sess.password = userJson.getPassword();
            sess.email = userJson.getEmail();

            res.redirect(generateUrl(req) + '/chat');
        }else {
            res.render('login.html.twig', {url : generateUrl(req) ,Dfalse : "Username or Password doesn't exists"});
        }
    }

});


// Register
app.get('/register',function (req,res) {
    sess = req.session;

    if(sess.email) {
        res.redirect(generateUrl(req) + '/chat');
    }else {
        res.render('register.html.twig');
    }
});

app.post('/register',function(req,res){
    sess = req.session;

    var user = new User();
    user.setUserName( req.body.username );
    user.setPassword( req.body.password );
    user.setEmail( req.body.email );

    const Count = require('./Model/Vendor/Count');
    var countUser = new Count();
    var test = countUser.countUser(user);

    if (test){
        const Insert = require('./Model/Vendor/Insert');
        var insertUser = new Insert();
        insertUser.insertUser(user);

        sess.email = user.getEmail();
        sess.username = user.getUserName();
        sess.password = user.getPassword();

        res.redirect( generateUrl(req) + '/chat');
    }else{
        res.render('register.html.twig', {url : generateUrl(req) ,Dusername : "Username already Exists, please choose another username", Demail : "email already exists"});
    }
});


//Profil :

app.get('/profil',function (req,res) {
    sess = req.session;

    if(sess.email) {
        var user = new User();
        user.setEmail(sess.email);
        user.setPassword(sess.password);
        user.setUserName(sess.username);

        res.render('profil.html.twig', {url : generateUrl(req) ,user : user });
    }else{
        res.redirect( generateUrl(req) + '/login');
    }
});

//Deconnect

app.get('/deconnect',function (req,res) {
    req.session.destroy();
    res.redirect(generateUrl(req) + '/login');

});


//Chat

app.get('/chat',function (req,res) {
    sess = req.session;

    if(sess.email) {
        var user = new User();
        user.setEmail(sess.email);
        user.setPassword(sess.password);
        user.setUserName(sess.username);

        res.render('chat.html.twig', {url : generateUrl(req) ,user : user });
    }else{
        res.redirect( generateUrl(req) + '/login');
    }
});

//game
app.get('/game',function (req,res) {
    sess = req.session;

    if(sess.email) {
        var user = new User();
        user.setEmail(sess.email);
        user.setPassword(sess.password);
        user.setUserName(sess.username);

        res.render('game.html.twig', {url : generateUrl(req) ,user : user });
    }else{
        res.redirect( generateUrl(req) + '/login');
    }
});



var listUserConnected = [];
var tt = [];

setInterval( function () {
    console.log('********************');
    console.log('User connected in our servers : ');
    if (listUserConnected.length == 0){
        console.log('nobody is there');
    }
    for(var i=0; i < listUserConnected.length; i++){
        console.log(listUserConnected[i].username + ' is connected ');
    };
    console.log('********************');
}, 5000);


io.on('connection', function(socket){

    socket.on('sendInformationUser', function(data){
        console.log(data.username + ' just logged in');

        data.sock = socket;

        data.sock.on('disconnect', function(){
            for(var i=0; i < listUserConnected.length; i++){
                if (listUserConnected[i].sock.id == data.sock.id){
                    console.log (listUserConnected[i].username + ' is left');
                    listUserConnected.splice(i , 1);
                }
            }
        });

        listUserConnected.push(data);
    });

    socket.on('message', function (data) {
        sendForUser(data);
    });



    socket.on('getListUsersConnected',function (data) {
        for(var i=0; i < listUserConnected.length; i++){
            if (listUserConnected[i].email == data.email){
                //nothing
            }else {
                var user = new User();
                user.setUserName(listUserConnected[i].username);
                user.setEmail(listUserConnected[i].email);
                tt.push(user);
            }
        }
        if (tt.length == 0){
            socket.emit('setListUsersConnected', "nobody is there" );
        }
        socket.emit('setListUsersConnected', tt );
        tt = [];

    });


    socket.on('publicMessage', function (data) {
        socket.broadcast.emit('broadcasting', data);
        socket.emit('broadcasting', data);
    });



});




function sendForUser(data) {
    for (var i = 0; i < listUserConnected.length; i++) {
        if (listUserConnected[i].email == data.email) {
            listUserConnected[i].sock.emit('message', data);
        }

    }
}















