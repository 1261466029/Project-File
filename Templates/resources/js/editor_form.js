define( 'editor_form' , function( w , u ){
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

        login_block_id : 'login_block',

        password_block_id : 'password_block',

        form_className : 'alert_form',

        styleRules : {

            'verify_form' : {
                'fail' : {
                    'target' : '.alert-container .detail.fail',
                    'type' : 'style',
                    'styleRules' : {

                        'color' : 'red',
                        'font-size' : '12px',
                        'margin-top' : '5px'

                    }
                },
                'btn' : {
                    'target' : '.alert-container .alert-btn',
                    'type' : 'style',
                    'styleRules' : {

                        'width' : '180px'

                    }
                },
                'bigger_btn' : {
                    'target' : '.alert-container .alert-btn.bigger',
                    'type' : 'style',
                    'styleRules' : {

                        'width' : '390px'

                    }
                },
                'media_bigger_btn' : {

                    'target' : '.alert-container .alert-btn.bigger',
                    'type' : 'media',
                    'styleRules' : {

                        'width' : '260px'

                    },
                    'size' : 'max-width:768px'

                },
                'btn_left' : {
                    'target' : '.alert-container .alert-btn.btn_left',
                    'type' : 'style',
                    'styleRules' : {

                        'float' : 'right',

                        'margin-right' : '5px',

                        'width' : '190px'

                    }
                },
                'btn_right' : {
                    'target' : '.alert-container .alert-btn.btn_right',
                    'type' : 'style',
                    'styleRules' : {

                        'float' : 'left',

                        'margin-left' : '5px',

                        'width' : '190px'

                    }
                },
                'media_btn' : {
                    'target' : '.alert-container .alert-btn.btn_left,.alert-container .alert-btn.btn_right,.alert-container .alert-btn',
                    'type' : 'media',
                    'styleRules' : {

                        'width' : '110px'

                    },
                    'size' : 'max-width:768px'
                },
                'alert_form' : {

                    'target' : '.alert-container .alert_form',
                    'type' : 'style',
                    'styleRules' : {

                        'width' : 'calc(100% - 100px)'

                    }

                },
                'media_alert_form' : {

                    'target' : '.alert-container .alert_form',
                    'type' : 'media',
                    'size' : 'max-width:500px',
                    'styleRules' : {

                        'width' : '100%',

                        'padding' : '15px'

                    }

                }

            },

        },

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

        'mousemove' : []

    }, jump_href = function( href ){

        if( w.location.href == href )

            w.location.reload();

        w.location.href = href;

    }, target , is_style;

    return function( callback ){

        return callback;

    }( function( tool , $ , ajax , include , set_style_rules , toast , putty , lang , alert , verify , login_status , ajax_url ){

        var callback,fn,self,

            handle_style_rules = function(){

                if( !is_style && ( is_style = 1 ) )

                    tool.each( default_config.styleRules , function(){

                        set_style_rules(this);

                    } , true );

            };

        return callback = new Function(),

            callback.prototype = fn = {

                init : function(){

                    self = this;

                    this.check();

                    handle_style_rules();

                    return self;

                },

                login : function( url ){

                    this.login_url = url || '';

                    this.alert_type = 'reply';

                    if( !login_status )

                        this.login_alert();

                    return this;

                },

                edit : function( url_login , url_password ){

                    this.login_url = url_login;

                    this.password_url = url_password;

                    this.alert_type = 'edit';

                    if( !login_status )

                        this.input_password_alert();

                    return this;

                },

                remove : function( url_login , url_password ){

                    this.login_url = url_login;

                    this.password_url = url_password;

                    this.remove_url = u;

                    this.alert_type = 'remove';

                    if( !!login_status )

                        this.remove_url = url_login;

                    this.remove_alert();

                    return this;

                },

                login_alert : function(){

                    var alert_body = '<form action="'+ this.login_url +'" method="POST" class="text_left '+default_config.form_className+'" id="'+ default_config.login_block_id +'" style="margin:auto;"> <div class="form-group">\n' +

                        '    <label for="login_username">'+ lang.alert.login.username +'</label>\n' +

                        '    <input style="height:50px;border-radius:0;" data-verify_mode="underline" data-verify_type="check_empty" data-verify_detail_target="'+ lang.alert.login.username +'  " type="text" name="username" class="form-control" id="login_username" placeholder="">\n' +

                        '  </div> ' +
                        '' +
                        '<div class="form-group">\n' +

                        '    <label for="login_password">'+ lang.alert.login.password +'</label>\n' +

                        '    <input style="height:50px;border-radius:0;" data-verify_mode="underline" data-verify_type="check_empty" data-verify_detail_target="'+ lang.alert.login.password +'  " type="password" name="password" class="form-control" id="login_password" placeholder="">\n' +

                        '  </div></form>',

                        get_login_block = function(){

                            return document.getElementById( default_config.login_block_id );

                        };

                    return alert({

                        header : lang.alert.login.header,

                        body : alert_body,

                        btns : [{

                            title : lang.alert.login.btn_confirm,

                            click : function( hide ){

                                var data = verify( get_login_block() ).verify();

                                if( data.num <= 0 )

                                    data.submit();

                            },

                            'class' : 'active bigger'

                        }]

                    }).show(),

                        this;

                },

                input_password_alert :function(){

                    var alert_body = '<form action="'+ this.password_url +'" method="POST" class="text_left '+default_config.form_className+'" id="'+ default_config.password_block_id +'" style="margin:auto;"> <div class="form-group">\n' +

                        '    <label for="input_password">'+ lang.alert.password.password +'</label>\n' +

                        '    <input style="height:50px;border-radius:0;" data-verify_mode="underline" data-verify_type="check_empty" data-verify_detail_target="'+ lang.alert.password.password +'  " type="password" name="password" class="form-control" id="input_password" placeholder="">\n' +

                        '  </div> ' +
                        ' </form>',

                        get_password_block = function(){

                            return document.getElementById( default_config.password_block_id );

                        };



                    return alert({

                        header : lang.alert.password.header,

                        body : alert_body,

                        btns : [{

                            title : lang.alert.password.btn_confirm,

                            click : function( hide ){

                                var data = verify( get_password_block() ).verify();

                                if( data.num <= 0 )

                                    data.submit();

                            },

                            'class' : 'active btn_left'

                        },{

                            title : lang.alert.password.btn_login,

                            click : function( hide ){

                                hide();

                                self.login_alert();

                            },

                            'class' : 'btn_right'

                        }]

                    }).show(),

                        this;

                },

                remove_alert : function(){

                    return alert({

                        header : lang.alert.remove.header,

                        body : lang.alert.remove.body,

                        btns : [{

                            title : lang.alert.remove.btn_confirm,

                            click : function( hide ){

                                hide();

                                if( self.remove_url )

                                    jump_href( self.remove_url );

                                else

                                    self.input_password_alert();

                            },

                            'class' : 'active btn_left'

                        },{

                            title : lang.alert.remove.btn_concel,

                            click : function( hide ){

                                hide();

                            },

                            'class' : 'btn_right'

                        }]

                    }).show(),

                        this;

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

                }

            },

            new callback().init();

    } )

}( window , void( 0 ) ) , [ 'tool' , 'jquery' , 'ajax', 'include' , 'set_style_rules' , 'toast' , 'putty' , 'lang' , 'alert' , 'verify' , 'login_status' , 'ajax_url' ] );

