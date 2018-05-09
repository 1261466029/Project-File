define( 'scroll_banner' , function( w , u ){
    var default_config = {

        context : 'body',

        err_code : {

            1001 : {
                code : 1001,
                template : '.js文件  [0]  未被引入 ...',
                status : 0
            },

            1002 : {

                code : 1002,
                template : '参数不正确，请检查录入参数！',
                status : 2

            }

        },

        max_length : 2,

        regexp_list : [/ \[(\d+)\] /g],

    }, err = function( code , arr , callback ){
        var config = default_config.err_code,
            _callback = 'function' == typeof callback ?callback : function(){},
            status = ( ( config[ code ] || {} ).status + '' || '' ).split( ',' ),
            err_callback = function( status ){
                switch( status - 0 ){
                    case 0:
                        throw_error( split_string( config[ code ].template , arr ) );
                        break;
                    case 1:
                        console_warn( split_string( config[ code ].template , arr ) );
                        break;
                    case 2:
                        console_log( split_string( config[ code ].template , arr ) );
                        break;
                    case 3:
                        alert( split_string( config[ code ].template , arr ) );
                        break;
                    case 4:
                        _callback( split_string( config[ code ].template , arr ) );
                        break;
                }
            },
            i = 0,
            length = status.length;
        for( ; i < length ; i ++ )
            err_callback( status[ i ] );
    }, split_string = function( str , arr ){
        var regexp = default_config.regexp_list[ 0 ],
            _arr = !!arr && 'object' == typeof arr ? arr : [];
        return str.replace( regexp , function( all , key ){
            return _arr[ key ] || '';
        } );
    }, throw_error = function( template ){
        throw new Error( template );
    }, console_warn = function( template ){
        console.warn( template );
    }, console_log = function( template ){
        console.log( template );
    }, append = function( target , parent ){
        return parent.appendChild( target ),
            parent;
    }, clone = function( target ){
        return target.cloneNode();
    },remove = function( target ){
        var parent;
        return parent = target.parentNode,
            parent.removeChild( target ),
            parent;
    },create = function( node ){

        return document.createElement( node );

    }, addeventlis_list = {

        'mousemove' : []

    }, target;

    return function( callback ){

        return callback;

    }( function( config , tool , $ , putty  ){

        var callback,fn,self,
            handle_arguments = function( config ){

                var result = {},
                    data = tool.default_object( config );

                result.context = handle_context( data.context );

                result.units = handle_units( data.units );

                result.max_length = handle_max_length( data.max_length );

                result.resize = handle_resize( data.resize );

                return result;

            },
            handle_context = function( context ){

                var target = $( context );

                return target.length && tool.is_dom( target.get( 0 ) ) ?

                        target : u;

            },
             handle_units = function( units ){

                 var target = $( units );

                 return target.length && tool.is_dom( target.get( 0 ) ) ?

                     target : u;

             },
            handle_max_length = function( max_length ){

                 return tool.in_case(

                     max_length !== 0 && !max_length || !tool.is_number( max_length - 0 ) ,

                     default_config.max_length,

                     max_length - 0

                 );

            },
            handle_resize = function( resize ){

                var result = [],
                    target = {};

                return tool.each( resize , function( key , value ){

                    if( tool.is_number( key - 0 ) && tool.is_number( value - 0 ) )

                        target[ key - 0 ] = value - 0;

                } ),

                    arr_sort( target , function( key , value ){

                        return {

                            size : key,

                            length : value

                        }

                    } );

            },
            handle_style_context = function( context ){

                return $( context ).css({

                    width : '100%',
                    overflow : 'hidden'

                });

            },
            handle_style_units = function( units , context , length ){

                return $( units ).css({

                    width : get_width( context ) / length + 'px',

                    float : 'left',

                    'box-sizing' : 'border-box',

                    '-webkit-box-sizing' : 'border-box',

                    '-moz-box-sizing' : 'border-box',

                    '-ms-box-sizing' : 'border-box',

                    '-o-box-sizing' : 'border-box',

                    'padding' : '0 5px'

                });

            },
            get_width = function( unit ){

                return parseFloat( $( unit ).css( 'width' ) );

            },
            get_window_width = function(){

                return $( w ).width();

            },
            set_transform_x_move = function( target , x ){

                return $( target ).css({

                    'transform' : 'translateX('+ x +'px)',

                    '-webkit-transform' : 'translateX('+ x +'px)',

                    '-moz-transform' : 'translateX('+ x +'px)',

                    '-ms-transform' : 'translateX('+ x +'px)',

                    '-o-transform' : 'translateX('+ x +'px)'

                })

            }, arr_sort = function( arr , callback ){

                var result = [],
                    index = 0,

                    callback = tool.is_function( callback ) ?

                        callback : function( key , value ){

                            return value;

                        };

                return tool.each( arr , function( key , value ){

                    index = 0;

                    if( result.length )

                        tool.each( result , function( _key , _value ){

                            if( _value > value )

                                return result.splice( index , 0 , callback( key , value ) ),

                                    false;

                            index ++;

                        } , true );

                    else

                        result.push( callback( key , value ) );

                } , true ),

                    result;

            };

        return callback = new Function(),

            callback.prototype = fn = {

                init : function(){

                    self = this;

                    var data;

                    this.check();

                    data = handle_arguments( config );

                    if( !data.context || !data.units )

                        return this.check( 'arguments undefined' ),

                            this;

                    this.index = 0;

                    this.data = data;

                    this.context = handle_style_context( data.context );

                    this.units = handle_style_units( data.units , this.context , this.max_length );

                    this.resize_data = data.resize;

                    this.max_length = data.max_length;

                    this.create_content();

                    this.resize_callback();

                    this.resize();

                    return self;

                },

                err : function( arr ){

                    return err( this.errCode , arr ),

                        this;

                },

                check : function( ins ){

                    var err_arr = [];

                    switch( ins ){

                        case 'arguments undefined':

                            this.errCode = 1002;

                            this.err();

                            break;

                        default :

                            err_arr[ 0 ] = [];

                            if( !tool || !$ || !putty ){

                                this.errCode = 1001;

                                if( !tool )

                                    err_arr[ 0 ].push( 'tool.js' );

                                if( !$ )

                                    err_arr[ 0 ].push( 'define_jquery.js' );

                                if( !putty )

                                    err_arr[ 0 ].push( 'putty.js' );

                                err_arr[ 0 ] = err_arr[ 0 ].join( ' , ' );

                                this.err( err_arr );

                            }

                            break;

                    }

                },

                to_left : function(){

                    if( -- this.index < 0 )

                        this.index ++;

                    this.transform();

                    return this;

                },

                to_right : function(){

                    if( ++ this.index > this.units.length - this.max_length )

                        this.index --;

                    this.transform();

                    return this;

                },

                to_zero : function(){

                    this.index=0;

                    this.transform();

                    return this;

                },

                to_end : function(){

                    this.index = this.max_length - 1;

                    this.transform();

                    return this;

                },

                transform : function(){

                    if( !!this.errCode )

                        return this;

                    var x_transform = 0 - this.index * this.units_width;

                    set_transform_x_move( this.content , x_transform );

                    return this;

                },

                create_content : function(){

                    var content;

                    if( !this.content )

                        content = this.content = create( 'div' ),

                            tool.each( this.units , function(){

                                append( this , content );

                            } , true ),

                            $( this.context ).html( '' ).append( content );

                    return this;

                },

                resize_callback : function(){

                    var width = get_window_width(),
                        status = 0;

                    tool.each( this.resize_data , function( key , value ){

                        if( value.size > width )

                            return self.to_zero(),

                                self.max_length = value.length,

                                status = 1,

                                false;

                    } , true , true );

                    if( !status )

                        self.to_zero(),

                            self.max_length = this.data.max_length;

                    this.units = handle_style_units( this.units , this.context , this.max_length );

                    this.units_width = get_width( this.context ) / this.max_length ;

                    this.content.style.width = this.units_width * this.units.length + 'px';

                    this.transform();

                    return this;

                },

                resize : function(){

                    $( w ).on( 'resize' , function(){

                        self.resize_callback();

                    } );

                    return this;

                }

            },

            new callback().init();

    } )

}( window , void( 0 ) ) , [ 'tool' , 'jquery' , 'putty' ] );

