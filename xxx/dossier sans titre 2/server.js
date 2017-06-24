var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});


app.get('/etage/:etagenum/chambre', function(req, res) {
	if (req.params.etagenum === '3333'){
		res.setHeader('Content-Type', 'text/plain');
    	res.end('Vous êtes à la chambre de l\'étage n°' + 3);
	}else {
		res.setHeader('Content-Type', 'text/plain');
   	    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
	}
    
});

app.get('/etage/:etagenum/chambres', function(req, res) {
	var noms = ['chakib', 'nabil', 'narim'];
	res.render('chambre.ejs', {compteur: req.params.etagenum, noms: noms});
    

});

//gerer les erreurs 404
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3333);