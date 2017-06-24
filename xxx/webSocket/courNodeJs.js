var http = require('http'); -> renvoie un objet de type http

appel a une bibliotheque nodeJs, la variable http est un objet 

var server = http.createServer();
http.createServer est une methode qui renvoie un objet de type server qui permet de creer un serveur 

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
on peut imaginer que dans le code source de createServer 
function createServer(par){
	//construction d'un objet server a partir du par qui sera une fonction anonyme 
	par();
	var server = new server(...);

	return server;
}

server.listen(8080); pour lancer le serveur 


