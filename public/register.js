/**
 * Created by macbookpro on 19/06/2017.
 */

$(document).ready(function() {

    $('#_email').text('');
    $('#_password').text('');
    $('#_username').text('');

    $('#email').on('input', function () {
        var texte = $(this).val();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(texte.match(re)){
            $(this).css('borderColor', 'green');
            $('#_email').text('');
        }else {
            $(this).css('borderColor', 'red');
            $('#_email').text('Invalid Email');
            $('#_email').css('color', 'red').css('font-style' ,'italic');
        }

    });

    $('#password').on('input', function () {
        var text = $(this).val();
        if (text.length < 4){
            $(this).css('borderColor', 'red');
            $('#_password').text('too short');
            $('#_password').css('color', 'red').css('font-style' ,'italic');

        }else {
            $(this).css('borderColor', 'green');
            $('#_password').text('');
        }
    });

    $('#username').on('input', function () {
        var text = $(this).val();
        if (text.length < 4){
            $(this).css('borderColor', 'red');
            $('#_username').text('too short');
            $('#_username').css('color', 'red').css('font-style' ,'italic');

        }else {
            $(this).css('borderColor', 'green');
            $('#_username').text('');
        }
    });


    $('form').on('submit', function (e) {

        if($('#_username').text() != '' || $('#_email').text() != '' || $('#_password').text() != '' ){
            e.preventDefault();
        }
    });

    $('#infos').on('click', function () {
        alert('Hi this site is realized by a group of students of Supinfo Paris, if you encounter a problem you can contact us at any time on 222691@SUPINFO.COM, The two students Chakib and Samy deal with the development part of the application, jeremy takes care of the management and Sarah keeps the business');
    })


});

