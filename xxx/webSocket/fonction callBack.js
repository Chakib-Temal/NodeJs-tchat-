fonction de callback

si on veut exigé que la parametre gg soit une fonction il faut mettre dans le contenue de la fonction salu un    gg();

function salu(gg,ee){
	alert(gg()+ee);
}

function retour2(){
	return 33;
}

salu(retour2, 33);

on exige que le parametre gg soit une fonction en utilisant les parenthese dans la declaration de la fonction 

si jamais on mis pas de gg() 

function salu(gg, ee){
		alert(gg+ee)	
}
salu(retour2, 33);

on va recevoir une reponse en forme de string qui retourne lektiba de la fonction gg; et non pas la valeur de retour 20 

dans ce cas on peu faire 

function salu(gg, ee){
		alert(gg+ee)	
}
salu(retour2(), 33);

si on utilise les parenthese dans l'appel a la fonction ca veut dire qu'on envoie la valeur retourné de la finction 


on peu utiliser des fonction anonyme :

function test2(hh, gg){
		alert(gg()+hh);
	}
	
test2(22, function(){return 22 });








function test2( gg){
		alert(gg());
	}
	
test2(function(aa, bb){var a= 1;var b= 2; return a+b });







donc pour ce morceau de code 

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);

dans la methode createServer

function createServer(aa){
	aa(); // plus bcps de choses bien sur 
}




ou encore la derniere :
on peu donner un nom de a une variable qui sera compter comme le nom de la fonction 


function test2( gg){
		alert(gg());
	}
	
var haha = function(aa, bb){var a= 1;var b= 2; return a+b };

test2(haha);

// on le remplacer avec : 
function haha(aa, bb){var a= 1;var b= 2; return a+b };



