define( 'page' , function( w , u ){
    var default_config = {

        context : 'body',

        err_code : {

            1001 : {
                code : 1001,
                template : '.js文件  [0]  未被引入 ...',
                status : 0
            }

        },

        regexp_list : [/ \[(\d+)\] /g],

        full_image_unit : '.full_block',

        attr_url_key : 'data-full_id',

        attr_full_min_height : 'data-full_min_height',

        attr_full_attachment : 'data-full_attachment',

        attr_show_input_count : 'data-show_input_count',

        get_show_input_target : '[data-show_input_count]',

        get_block : '.block',

        active_className : 'active',

        none_className : 'none',

        hide_className : 'hide_block',

        hover_nav_background : '.page_header .header_content .hover_nav_background',

        hover_nav_show : '.hover_nav_show',

        nav_unit : '.page_header .header_content .nav_units .nav_unit',

        check_nav_hover : '.page_header .header_content .nav_units .nav_unit,.page_header .header_content .hover_nav_background',

        check_verify_password : '[data-check_user_password]',

        menu_change_nav : '.page_header .menu',

        menu_change_nav_container : '.page_header .header_content .nav_container',

        min_full_image_height : 500,

        speed : 100,

		scroll_top_default_length : 100

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
    }, addeventlis_list = {

        'mousemove' : [],

		'mousewheel' : []

    }, target;

    return function( callback ){

        return callback;

    }( function( tool , $ , ajax , include , set_style_rules , toast , putty , lang , alert , verify , editor_form , scroll_banner , full_image , ajax_url ){

        var callback,fn,self,

            get_full_images = function(){

                var target = $( default_config.full_image_unit ),
                    attr_url_key = default_config.attr_url_key,
                    attr_full_min_height = default_config.attr_full_min_height,
                    attr_full_attachment = default_config.attr_full_attachment,
                    min_full_image_height = default_config.min_full_image_height,
                    result = [];

                return tool.each( target , function( key , value ){

                    result.push({

                        url_key : value.getAttribute( attr_url_key ),

                        dom : value,

                        min_height : value.getAttribute( attr_full_min_height ) || min_full_image_height,

                        attachment : value.getAttribute( attr_full_attachment ) || ''

                    });

                } , true ),

                    result;

            },

            get_background_ratio = function( url , dom , min_height , attachment , data , callback ){

                var img = new Image(),
                    result = {};

                img.onload = function(){

                    data.set( dom , result = {

                        width : this.width,

                        height : this.height,

                        min_height : min_height,

                        attachment : attachment,

                        ratio : this.width / this.height,

                        image : this,

                        url : url

                    } );

                    callback( result );

                };

                img.onerror = function(){

                    callback();

                };

                img.src = url;

            },

            handle_context = function( context ){

                var _context = $( context ),
                    target;

                if( target = _context.get( 0 ) )

                    return target;

                return $( default_config.context ).get( 0 );

            },

            create_node = function( node , attr , style , html ){

                var NODE = $( document.createElement( node ) );

                return attr && NODE.attr( attr ),

                    style && NODE.css( style ),

                    html && NODE.html( html ),

                    NODE.get( 0 );

            },

            set_active = function( target ){

                return $( target ).addClass( default_config.active_className );

            },

            remove_active = function( target ){

                return $( target ).removeClass( default_config.active_className );

            },

            is_active = function( target ){

                return $( target ).hasClass( default_config.active_className );

            },

            set_none = function( target ){

                return $( target ).addClass( default_config.none_className );

            },

            remove_none =  function( target ){

                return $( target ).removeClass( default_config.none_className );

            },

            set_hide = function( target ){

                return $( target ).addClass( default_config.hide_className );

            },

            remove_hide =  function( target ){

                return $( target ).removeClass( default_config.hide_className );

            },

            get_nav = function(){

                return $( default_config.nav_unit );

            },

            get_document_width = function(){

                return $( w ).width() + 17;

            },

            get_document_height = function(){

                return $( w ).height();

            },

            push_addeventlis_list = function( type , target , join , leave ){

                addeventlis_list[ type ].push({

                    'target' : target,

                    'join' : join,

                    'leave' : leave

                });

            },

            get_height = function( target ){

                var $_target = $( target );

                return $_target.height() + parseFloat( $_target.css( 'padding-bottom' ) ) + parseFloat( $_target.css( 'margin-bottom' ) ) + parseFloat( $_target.css( 'padding-top' ) ) + parseFloat( $_target.css( 'margin-top' ) );

            };

        return callback = new Function(),

            callback.prototype = fn = {

                init : function(){

                    self = this;

                    this.check();

                    this.handle_full_image();

                    this.resize();

                    this.set_page_number_change_callback();

                    this.nav();

                    this.handle_blur_verify_password();

                    this.handle_mousemove();

					this.handle_wheel();

                    this.verify();

                    this.show_input_count();

                    this.editor_form = editor_form();

                    this.menu();

                    return self;

                },

                verify : function(){

                    var form;

                    $( 'form' ).each(function(){

                        var data = verify( this , {

                            blur : true

                        } );

                        $( this ).submit(function(){

							var num = data.verify().num;

                            return num > 0 ?

                                false :

                                u;

                        })

                    });

                },

                login : function( login_url ){

                    return this.editor_form.login( login_url )

                },

                edit : function( url_login , url_password ){

                    return this.editor_form.edit( url_login , url_password )

                },

                remove : function( url_login , url_password ){

                    return this.editor_form.remove( url_login , url_password )

                },

                verify_password : function( value , bn ){

                    return !!bn ? self.get_password_status() : u;

                },

                get_password_status : function(){

                    return this.verify_password_status == 1;

                },

                handle_blur_verify_password : function(){

                    var type = 'blur',
                        verify_password = default_config.check_verify_password;

                    return $( verify_password ).on( type , function(){

                        self.blur_verify_password( this.value , this );

                    } ),

                        this;

                },

                blur_verify_password : function( value , target ){

                    var verify_password_url;

                    if( !value )

                        return;

                    ajax_url = ajax_url || {};

                    verify_password_url = tool.default_object( ajax_url.verify_password );

                    ajax({

                        url : verify_password_url.url,
                        data : tool.assign( {

                            password : value

                        } , verify_password_url.data ),
                        type : 'POST',
                        success : function( res ){

                            switch( tool.default_object( res ).status - 0 ){

                                case 1:

                                    self.verify_password_status = 1;

                                    break;

                                case 0:

                                    self.verify_password_status = 0;

                                    break;

                            }

                            verify( $( $(target).parentsUntil( 'form' ) ).get( 0 ) , {

                                hover :true

                            } ).verify();

                        }

                    })

                },

                err : function( arr ){

                    return err( this.errCode , arr ),

                        this;

                },

                check : function( ins ){

                    var err_arr = [];

                    switch( ins ){

                        default :

                            err_arr[ 0 ] = [];

                            if( !tool || !$ || !ajax || !include || !set_style_rules || !toast || !putty || !lang || !alert || !verify ){

                                this.errCode = 1001;

                                if( !tool )

                                    err_arr[ 0 ].push( 'tool.js' );

                                if( !$ )

                                    err_arr[ 0 ].push( 'define_jquery.js' );

                                if( !ajax )

                                    err_arr[ 0 ].push( 'ajax.js' );

                                if( !include )

                                    err_arr[ 0 ].push( 'include.js' );

                                if( !set_style_rules )

                                    err_arr[ 0 ].push( 'set_style_rule.js' );

                                if( !toast )

                                    err_arr[ 0 ].push( 'toast.js' );

                                if( !putty )

                                    err_arr[ 0 ].push( 'putty.js' );

                                if( !lang )

                                    err_arr[ 0 ].push( 'lang.js' );

                                if( !alert )

                                    err_arr[ 0 ].push( 'alert.js' );

                                if( !verify )

                                    err_arr[ 0 ].push( 'verify.js' );

                                err_arr[ 0 ] = err_arr[ 0 ].join( ' , ' );

                                this.err( err_arr );

                            }

                            break;

                    }

                },

                handle_full_image : function(){

                    this.full_image_ratio_list = new Map();

                    var target = get_full_images(),
                        length = target.length,
                        callback = function( data ){

                            if( ++ loaded_num >= length )

                                set_background(),

                                self.resize_callback();

                        },
                        set_background = function(){

                            var style_background_left = 'url(',
                                style_background_right = ') no-repeat center center';

                            self.full_image_ratio_list.forEach(function( value , key ){

                                key.style.background = style_background_left + value.url + style_background_right;

                            });

                        },
                        loaded_num = 0;

                    tool.each( target , function( key , value ){

                        if( full_image[ value.url_key ] )

                            get_background_ratio( full_image[ value.url_key ] , value.dom , value.min_height , value.attachment , self.full_image_ratio_list , callback );

                    } , true );

                },

                resize_callback : function(){

                    var width,height,attr,target;

                    this.full_image_ratio_list.forEach(function( value , key ){

                        attr = {

                            'background-size' : '100% 100%',

                            'background-attachment' : ''

                        };

                        target = $( key );

                        width = target.width();

                        height = width / value.ratio;

                        if( height < value.min_height )

                                height = value.min_height,

                                    attr[ 'background-size' ] = 'auto 100%';

                        if( value.attachment )

                            attr[ 'background-attachment' ] = value.attachment;

                        target.css( 'min-height' , height + 'px' ).css( attr );

                    })

                },

                resize : function(){

                    $( w ).on( 'resize' , function(){

                        self.resize_callback();

                    } )

                },

                page_number : function( context , className ){

                    var content,
                        target,
						wheel_status,
                        page_numbers = $(),
                        _context = handle_context( context ),
                        _index= 0,
                        $_context = $( document ),
                        page_list = [],
                        status = 0,

                        set_number = function( num ){

                            return num < 10 ? '0' + num : num;

                        },
                        get_block = function(){

                            return $( default_config.get_block );

                        },
                        clear_active = function(){

                            return remove_active( page_numbers );

                        },
                        change_active = function( target ){

                            clear_active();

                            set_active( target );

                        },
                        animate = function( top ){

                            $( 'html,body' ).animate({

                                'scrollTop' : top + 'px'

                            } , clear_status/*{

                                easing : 'easing' ,

                                complete : clear_status

                            } */);

                        },
                        clear_status = function(){

                            setTimeout(function(){

                                status = 0;

                            } , default_config.speed )

                        },
                        set_status = function(){

                            status = 1;

                        },
                        scroll_callback = function(){

                            var scrollTop = $_context.scrollTop(),
                                target = $(),
                                before = $(),
                                after = $();

                            tool.each( page_list , function( key , value ){

                                before = this;

                                if( this.top <= scrollTop && scrollTop <= this.top + get_height( this.target ) / 2 )

                                    return target = before,

                                        false;

                                else if( this.top > scrollTop )

                                    return target = before,

                                        false;

                                after = this;

                            } );

                            if( !$( target.pagenum ).hasClass( default_config.active_className ) )

                                change_active( $( target.pagenum ) ),

                                self.page_number_change_callback( target.target );

                        };

                    return append( content = create_node( 'div' , {

                        'class' : className || ''

                    } ) , _context ),

                        tool.each( get_block() , function( key , value ){

                            var target_data;

                            append( target = create_node( 'div' , false , false , set_number( ++ _index ) ) , content );

                            page_list.push( target_data = {

                                'top' : $( value ).offset().top,

                                'target' : value,

                                'pagenum' : target

                            });

                            page_numbers[ page_numbers.length ++ ] = target;

                            $( target ).on( 'click' , function(){

                                if( !status )

                                    set_status(),

                                    change_active( this ),

                                    animate( target_data.top ),

                                    self.page_number_change_callback( target_data.target );

                            } );

                        } , true ),

                            scroll_callback(),

							push_addeventlis_list( 'mousewheel' , false , function( e , bn ){

								if( !!self.document_mobile )

									return u;
							
								var scrollTop = $_context.scrollTop(),
									height = get_document_height(),
									full_scroll = scrollTop + height,
									before;

								tool.each( page_list , function( key , value ){

									tool.in_case( !!bn , function(){
									
										if( wheel_status != value.top && value.top >= scrollTop && value.top < full_scroll )

											wheel_status = value.top,

											$( value.pagenum ).trigger( 'click' );
									
									} , function(){

										if( !!before && wheel_status != before.top && before.top < scrollTop && before.top + get_height( before.target ) >= scrollTop )

											wheel_status = before.top,

											$( before.pagenum ).trigger( 'click' );
									
									} );

									before = value;
								
								})

							} ),

                            $_context.on( 'scroll' , function( e ){

                                if( !status )

                                    scroll_callback( e );

                            }),

                            this;

                },

                set_page_number_change_callback : function( callback ){

                     return this.page_number_change_callback = tool.default_function( callback ),

                         this;

                },

                nav : function(){

                    var units = $( default_config.hover_nav_show ),
                        background = $( default_config.hover_nav_background ),
                        type = 'mousemove',
                        status = 0,

                        show_nav = function(){

                            if( get_document_width() <= 768 )

                                return self.document_mobile = true,
									
									hide_nav();

							else

								self.document_mobile = u;

                            var background_padding = 40,
                                height = 0,
                                target_height;

                            if( !!status )

                                return ;

                            status = 0;

                            tool.each( units , function(){

                                target_height = parseFloat( set_hide( remove_none( this ) ).css( 'height' ) );

                                if( height < target_height )

                                    height = target_height;

                            } , true );

                            status = 1;

                            background.height( 0 );

                            background.fadeIn( default_config.speed , function(){

                                background.height( height + background_padding );

                                setTimeout(function(){

                                    remove_hide( units );

                                } , default_config.speed );

                            } );

                        },
                        hide_nav = function(){

                            var height = 0;

                            if( !status )

                                return;

                            set_none( units );

                            setTimeout(function(){

                                background.fadeOut( default_config.speed , function(){

                                    status = 0;

                                } ).height( 0 );

                            } , default_config.speed / 2 );

                        };

                    return push_addeventlis_list( type , default_config.check_nav_hover , show_nav , hide_nav ),

                        this;

                },

                handle_mousemove : function(){

                    $( w ).on( 'mousemove' , function( e ){

                        var target = $( e.target ),
                            check_common = function( _target ){

                                var fill;

                                if( target.is( _target ) )

                                    return target.get( 0 );

                                if( !!( fill = target.parents( _target ) ).length )

                                    return fill.get( 0 );

                                return false;

                            },
                            _target;

                        tool.each( addeventlis_list.mousemove , function( key , value ){

                            if( _target = check_common( value.target ) )

                                value.join( e , _target );

                            else

                                value.leave( e , _target );

                        } );

                    } )

                },

				handle_wheel : function(){

					var callback = function( e , arg ){
					
						tool.each( addeventlis_list.mousewheel , function( key , value ){

                            value.join( e , arg );

                        } );
					
					}

					if( w.onmousewheel !== u )
				
						$( w ).on( {
					
							'mousewheel' : function( e ){

								var acea = e.originalEvent.wheelDelta < 0 ? 1 : 0;
								
								callback( e , acea );
								
							}
							
						} );
					
					else
					
						$( w ).on( {
							
							'DOMMouseScroll' : function( e ){

								var acea = e.originalEvent.detail > 0 ? 1 : 0; 
								
								callback( e , acea );
								
							}
							
						} );
				
				},

                show_input_count : function(){

                    var get_show_input_target = $( default_config.get_show_input_target ),
                        dom_map = new Map(),

                        value,
                        target,
                        max,
                        now,
                        data,

                        get_value_length = function( value ){

                            return ( tool.is_string( value ) ? value : '' ).length;

                        },

                        get_show_input_count = function( target ){

                            return $( $( target ).attr( default_config.attr_show_input_count ) )

                        },

                        splicing = function( now , max ){

                            return ( now || 0 ) + '/' + ( max || 0 );

                        },

                        set_value_length = function( target ){

                            var _target = $( target ).get( 0 ),

                                data = dom_map.get( _target );

                            now = data.now = get_value_length( tool.trim( _target.value ) );

                            data.target.html( splicing( now , max ) );

                        };

                    get_show_input_target.each(function(){

                        value = this.value = tool.trim( this.value );

                        dom_map.set( this , {

                            max : max = this.getAttribute( 'maxlength' ) || 0,

                            now : now = get_value_length( value ),

                            target : target = get_show_input_count( this )

                        } );

                        target.html( splicing( now , max ) );

                    }).on( 'input' , function(){

                        set_value_length( this );

                    } );

                    return this;

                },

                set_scroll_banner : function( context , units , max_length , resize ){

                    return this.scroll_banner = scroll_banner({

                        context : context,

                        units : units,

                        max_length : max_length,

                        resize : resize

                    }),

                        this;

                },

                scroll_banner : function(){

                    return new (function(){

                        this.to_left = new Function();

                        this.to_right = new Function();

                    })();

                },

                menu : function(){

                    var target = $( default_config.menu_change_nav ),
                        change_target = $( default_config.menu_change_nav_container ),
                        hide_target = function(){

                            return change_target.css({

                                height : 0,
                                'min-height' : 0,
                                overflow : 'hidden',

                            });

                        },
                        show_target = function(){

                            var height;

                            return change_target.css({}).css( 'min-height' , '300px' ).css( 'display' , 'block' ),

                                setTimeout(function(){

                                    change_target.css( 'height' , 'auto' );

                                } , 300 ),

                                change_target;

                        };

                    target.on( 'click' , function(){

                        if( is_active( target ) )

                            remove_active( target ),

                                hide_target();

                        else

                            set_active( target ),

                                show_target();

                    } )

                }

            },

            new callback().init();

    } )

}( window , void( 0 ) ) , [ 'tool' , 'jquery' , 'ajax', 'include' , 'set_style_rules' , 'toast' , 'putty' , 'lang' , 'alert' , 'verify' , 'editor_form' , 'scroll_banner' , 'full_image' , 'ajax_url'] );

