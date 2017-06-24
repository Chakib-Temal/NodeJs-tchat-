var http = require('http'); // serveur
var url = require('url'); //recupirer l'url
var querystring = require('querystring'); // recupirer les parametres

var monmodule = require('./monmodule');
monmodule.direBonjour();
monmodule.direByeBye();

var markdown = require('markdown').markdown;
console.log(markdown.toHTML('Un paragraphe en **markdown** !'));


var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
    if (page === '/chakib'){
    	res.writeHead(200, {"Content-Type": "text/plain"});
	    res.write('Bien le bonjour chakib  ');
	    res.write(params['prenom'] + params ['nom']); // recupirer les parametres envoyé dans la requete 
	   // res.write(page);
	    res.end();
    }else if (page === '/nabil'){
    	res.writeHead(200, {"Content-Type": "text/plain"});
	    res.write('Bien le bonjour nabil');
	    res.write(parameters);
	    res.write(page);
	    res.end();
    }else {
    	res.writeHead(400, {"Content-Type": "text/plain"});
	    res.write('par error');
	    res.write(page);
	    res.end();
    }

    
});

server.on('close', function(){
	console.log('good bye');
})



server.listen(3333);

