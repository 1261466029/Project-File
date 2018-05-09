!function(){

    var createForm = function( url , type ){

        return '<form id="' + id + '" method="' + type + '" action="' + url + '"></form>';

    },
        createInput = function( name , value ){

            return '<input name="' + name + '" value=\'' + value + '\' type="hidden" />';

        },
        id = 'sendForm',
        form;

    $.fn.extend({

        sendForm : function( url , data , type ){

            var form = $( createForm( url , type) ),
                num;

            type = type || 'GET';

            $( 'body' ).append( form );

            for( num in data ){

                form.append( createInput( num , typeof data[ num ] == 'object' && data[ num ] != null ? JSON.stringify( data[ num ] ) : data[ num ] ) );

            }

            form.submit();

        }

    })

}();

//$().sendForm( 'url.php' , { name : value } , 'GET || POST')