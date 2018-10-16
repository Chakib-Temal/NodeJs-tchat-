/**
 * Created by macbookpro on 26/06/2017.
 */

/**
 *
 */

$(document).ready(function(){

    var score = 0;
    var conteneur = document.getElementById("grilleDeJeux");

    //construction de la grille
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            var carre = document.createElement("p");
            conteneur.appendChild(carre);
            carre.id = 's' + j + i;

            carre.style.top = j * 40 + 'px';
            carre.style.left = i * 40 + 'px';
        }
    }

    var test1 = 1;
    var test2 = 1;
    var test3 = 1;
    var test4 = 1;
    var test5 = 1;

    var jeux = [
        [a(),0,a(),a(),0,a(),a(),a(),0,a()],
        [a(),0,a(),a(),a(),0,a(),a(),a(),0],
        [b(),0,b(),b(),0,b(),0,b(),b(),b()],
        [b(),b(),0,b(),b(),b(),0,b(),0,b()],
        [c(),c(),0,c(),c(),c(),0,c(),0,c()],
        [c(),c(),0,c(),c(),c(),0,c(),c(),0],
        [0,d(),0,d(),d(),0,d(),d(),d(),d()],
        [d(),d(),d(),0,d(),0,d(),0,d(),d()],
        [e(),0,0,e(),e(),0,e(),e(),e(),e()],
        [e(),e(),e(),e(),0,e(),0,e(),0,e()]
    ];
    //la logique des cellule
    function a(){
        var a = [1, 0][Math.floor(Math.random() * 2)];
        if(test1 < 4){
            if(a == 1){
                test1++ ;
                return a;
            }else {
                return a;
            }
        }else {
            return 0;
        }
    }

    function b(){
        var a = [1, 0][Math.floor(Math.random() * 2)];
        if(test2 < 5){
            if(a == 1){
                test2++ ;
                return a;
            }else {
                return a;
            }
        }else {
            return 0;
        }
    }

    function c(){
        var a = [1, 0][Math.floor(Math.random() * 2)];
        if(test3 < 4){
            if(a == 1){
                test3++ ;
                return a;
            }else {
                return a;
            }
        }else {
            return 0;
        }
    }

    function d(){
        var a = [1, 0][Math.floor(Math.random() * 2)];
        if(test4 < 4){
            if(a == 1){
                test4++ ;
                return a;
            }else {
                return a;
            }
        }else {
            return 0;
        }
    }

    function e(){
        var a = [1, 0][Math.floor(Math.random() * 2)];
        if(test5 < 5){
            if(a == 1){
                test5++ ;
                return a;
            }else {
                return a;
            }
        }else {
            return 0;
        }
    }

    var nombrePrises = 0;

    //evenement
    conteneur.addEventListener("click", logic, false);

    //la logique du jeux
    function logic(e) {

        if (e.target !== e.currentTarget) {

            var ligne = e.target.id.substring(1,2);
            var colonne = e.target.id.substring(2,3);

            if (jeux[ligne][colonne] == 0) {
                e.target.style.background = '#bbb';

                jeux[ligne][colonne] = 3;
                score++;

            } else if (jeux[ligne][colonne] == 1) {
                e.target.style.background = 'red';

                jeux[ligne][colonne] = 2;
                score++;

                nombrePrises++;
                //fin de la partie
                if (nombrePrises == 17) {
                    alert("All enemy battleships have been defeated! You win!");
                    alert('your score is '+score+' click');
                    $('#score').css('text-align', 'left').css('font-size', '150%').css('color', 'green');
                    $('#score').text('your win after '+score+' clicks');
                }

                // en cas de click une deuxieme fois dans une cellule selectionnée
            } else if (jeux[ligne][colonne] > 1) {
                alert("Stop wasting your torpedos! You already fired at this location.");
            }
        }
        e.stopPropagation();
    }

});
