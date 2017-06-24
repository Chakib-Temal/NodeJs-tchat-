var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

var lolo;

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    
    
    setInterval(function(){
    
    socket.emit('messages', lolo); 
	}, 10000);

    //socket.emit('message', 'Vous êtes bien connecté !');
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');

    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
        lolo = message;
	});


	
	socket.on('news_by_server', function(data){
                console.log(data);
    });


    socket.on('petit_nouveau', function(pseudo){
    	//console.log(pseudo);
    	socket.pseudo = pseudo;
    })
	
});




server.listen(3333);