define( 'change' , function( callback ){
	return callback;
}(function( w , u ){
	var default_config = {
		'args' : {
			'context' : 'body',
			'speed' : 500
		},
		'query' : {
			'trigger_target' : '[data-trigger_target]'
		},
		'attr' : {
			'functions' : 'data-trigger_target',
			'change_target' : 'data-change_target',
			'change_index' : 'data-change_target_index',
			'change_group_key' : 'data-change_group_key',
			'change_event_type' : 'data-change_event_type',
			'ajax_url' : 'data-ajax_url',
			'ajax_param' : 'data-ajax_param',
			'ajax_data' : 'data-ajax_data',
			'ajax_method' : 'data-ajax_method',
			'change_target_class' : 'data-change_target_class',
			'change_start_callback' : 'data-change_start_callback',
			'change_done_callback' : 'data-change_done_callback',
			'change_after_callback' : 'data-change_after_callback',
			'toast_title' : 'data-toast_title'
		},
		'styleRules' : {
			2 : {
				'load' : {
					'target' : '.load_animate_block',
					'className' : 'load',
					'type' : 'style',
					'styleRules' : {
						'overflow' : 'hidden',
						'min-height' : '250px',
						'perspective' : '1000px'
					}
				},
				'load_after' : {
					'target' : '.load_animate_block:after',
					'type' : 'style',
					'styleRules' : {
						'content' : '""',
						'position' : 'absolute',
						'background' : 'rgba( 255,255,255,.95 )',
						'top' : 0,
						'left' : 0,
						'right' : 0,
						'bottom' : 0,
						'z-index' : 100
					}
				},
				'load_before' : {
					'target' : '.load_animate_block:before',
					'type' : 'style',
					'styleRules' : {
						'content' : '""',
						'position' : 'absolute',
						'top' : '100px',
						'height' : '50px',
						'left' : 0,
						'right' : 0,
						'margin' : 'auto',
						'width' : '50px',
						'z-index' : 101,
						'animation' : 'change_animation_load_icon 1s ease 0s infinite alternate',
						'-webkit-animation' : 'change_animation_load_icon 1s ease 0s infinite alternate',
						'-o-animation' : 'change_animation_load_icon 1s ease 0s infinite alternate',
						'-moz-animation' : 'change_animation_load_icon 1s ease 0s infinite alternate',
						'-ms-animation' : 'change_animation_load_icon 1s ease 0s infinite alternate',
						'transform-style' : 'preserve-3d',
						'-webkit-transform-style' : 'preserve-3d',
						'-ms-transform-style' : 'preserve-3d',
						'-o-transform-style' : 'preserve-3d',
						'-moz-transform-style' : 'preserve-3d'
					}
				},
				'change_animation_load_icon' : {
					'target' : 'change_animation_load_icon',
					'type' : 'animation',
					'actions' : [{
						'target' : '0%',
						'styleRules' : {
							'background-color' : '#ff5400',
						}
					} , {
						'target' : '100%',
						'styleRules' : {
							'background-color' : '#00ffd0',
							'transform' : 'rotate3d( 0.2 , 1 , 0.2 , 360deg )',
							'-webkit-transform' : 'rotate3d( 0.2 , 1 , 0.2 , 360deg )',
							'-moz-transform' : 'rotate3d( 0.2 , 1 , 0.2 , 360deg )',
							'-ms-transform' : 'rotate3d( 0.2 , 1 , 0.2 , 360deg )',
							'-o-transform' : 'rotate3d( 0.2 , 1 , 0.2 , 360deg )'
						}
					}]
				}
			}
		},
		'functions' : {
			'show or hide' : 0,
			'switch' : 1,
			'load' : 2,
			'request' : 3,
			'toast' : 4
		},
		'event_list' : [ 'click' , 'change' ],
		'default_load_method' : 'GET',
		'default_group_key' : '__default__groupname',
		'default_event_type' : 'click',
		'active_class' : 'active',
		'err_code' : {
			1001 : {
				code : 1001,
				template : ' [0]  未被引入 ...',
				status : 0
			},
			1002 : {
				code : 1002,
				template : ' [0]  未被引入 ...',
				status : 1
			}
		},
		'regexp_list' : [/ \[(\d+)\] /g],
		'check_include_putty' : [ window.Map ]
	},
	check_putty = function(){
		var result = true;
		if( ![].forEach )
			return false;
		return default_config.check_include_putty.forEach(function( value ){
			if( false === result )
				return;
			u === value && 
				( result = false );
		}),
			result;
	};
	var create = function( node ){
		return document.createElement( node );
	},
	append = function( target , parent ){
		return parent.appendChild( target ),
			parent;
	},
	clone = function( target ){
		return target.cloneNode();
	},
	remove = function( target ){
		var parent;
		return parent = target.parentNode,
			parent.removeChild( target ),
			parent;
	},
	style,
	event_type;
	return function( json , tool , toast , ajax , set_style_rules , $ , putty , lang ){
		var handle_response = function( res ){
			var response;
			return tool.handle_try(function(){
				response = res;
			},function(){
				response = JSON.parse( res );
			}),
				response;
		},
		err = function( code , arr , callback ){
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
							alert({
								body : split_string( config[ code ].template , arr ),
								btns : [{
									'click' : function( hide ){
										hide();
									}
								}]
							}).show();
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
		}, create = function( node , attr , html ){
			var _node = document.createElement( node );
			return tool.each( attr , function( key , value ){
				_node.setAttribute( key , value );
			} , true ),
				_node.innerHTML = html || '',
				_node;
		}, create_div = function( attr , html ){
			return create( 'div' , attr , html );
		}, handle_context = function( context ){
			var args = default_config.args,
				target = $( context );
			if( target.length > 0 && tool.is_dom( target.get( 0 ) ) )
				return target;
			return $( args.context );
		}, handle_speed = function( speed ){
			var args = default_config.args;
			if( tool.is_number( speed ) )
				return speed;
			return args.speed;
		}, handle_arguments = function( json ){
			var data = tool.default_object( json ),
				result = {};
			result.context = handle_context( data.context );
			result.speed = handle_speed( data.speed );
			return result;
		}, query_change_target = function( context ){
			return $( $( context ).find( default_config.query.trigger_target ) );
		}, query_trigger_target = function( context , speed ){
			var target = query_change_target( context ),
				default_group_name = default_config.default_group_key,
				result = {},
				group_key,
				change_type;
			tool.each( target , function( key , value ){
				change_type = get_change_type( value );
				event_type = get_event_type( value );
				group_key = get_group_key( value );
				if( change_type == u )
					return;
				result[ event_type ] = result[ event_type ] || {};
				result[ event_type ][ change_type ] = result[ event_type ][ change_type ] || {};
				( result[ event_type ][ change_type ][ group_key ] = result[ event_type ][ change_type ][ group_key ] || [] ).push( handle_change_data( change_type , value , speed ) );
			} , true );
			return result;
		}, handle_change_data = function( type , target , speed ){
			var start_callback = get_change_start_callback( target ),
				done_callback = get_change_done_callback( target ),
				after_callback = get_change_after_callback( target ),
				result = {},
				functions_list = new functions(),
				set_self_className = function( target ){
					return $( target ).addClass( result.change_target_class );
				},
				remove_self_className = function( target ){
					return $( target ).removeClass( result.change_target_class );
				};
			result.target = $( target );
			result.start_callback = start_callback;
			result.done_callback = done_callback;
			result.after_callback = after_callback;
			result.change_target_class = get_change_target_class( result.target );
			result.index = get_change_index( result.target );
			switch( type - 0 ){
				case 0:
					result.change_target = $( $( get_change_target( result.target ) ).get( result.index ) );
					result.callback = function(){
						var bn = has_active( result.change_target );
						result.start_callback( result.change_target , result.target , result.index , bn );
						functions_list[ type ]( result.change_target , speed , function(){
							result.after_callback( result.change_target , result.target , result.index , bn );
						} , bn );
						!bn ? 
							set_self_className( result.change_target ) && set_active( result.change_target ) : 
							remove_self_className( result.change_target ) && remove_active( result.change_target );
						result.done_callback( result.change_target , result.target , result.index , bn );
					};
					break;
				case 1:
					result.change_target = $( $( result.change_target_list = $( get_change_target( result.target ) ) ).get( result.index ) );
					result.callback = function(){
						result.start_callback( result.change_target , result.change_target_list , result.target , result.index );
						remove_self_className( result.change_target_list );
						remove_active( result.change_target_list );
						set_self_className( result.change_target );
						set_active( result.change_target );
						functions_list[ type ]( result.change_target , result.change_target_list , speed , function(){
							result.after_callback( result.change_target , result.change_target_list , result.target , result.index );
						} );
						result.done_callback( result.change_target , result.change_target_list , result.target , result.index );
					};
					break;
				case 2:
					result.change_target = $( $( get_change_target( result.target ) ).get( result.index ) ).html( '' );
					result.ajax_url = get_ajax_url( result.target );
					result.ajax_param =  get_ajax_param( result.target );
					result.default_className = default_config.styleRules[ type ].load.className;
					result.callback = function(){
						result.start_callback( result.change_target , result.target , result.index );
						remove_self_className( result.change_target );
						remove_active( result.change_target );
						result.change_target.addClass( result.default_className );
						functions_list[ type ]( result.ajax_url , function( res ){
							set_self_className( result.change_target );
							set_active( result.change_target );
							result.change_target.removeClass( result.default_className ).html( res );
							result.after_callback( result.change_target , result.target , result.index , res );
						} , result.ajax_param );
						result.done_callback( result.change_target , result.target , result.index );
					};
					break;
				case 3:
					result.change_target = $( $( get_change_target( result.target ) ).get( result.index ) ).html( '' );
					result.ajax_url = get_ajax_url( result.target );
					result.ajax_method =  get_ajax_method( result.target );
					result.ajax_data =  get_ajax_data( result.target );
					result.callback = function(){
						result.start_callback( result.change_target , result.target , result.index );
						remove_self_className( result.change_target );
						remove_active( result.change_target );
						functions_list[ type ]( result.ajax_url , result.ajax_method , result.ajax_data , function( res ){
							set_self_className( result.change_target );
							set_active( result.change_target );
							result.after_callback( result.change_target , result.target , result.index , res );
						} );
						result.done_callback( result.change_target , result.target , result.index );
					};
					break;
				case 4:
					result.toast_title = get_toast_title( result.target );
					result.callback = function(){
						result.start_callback( result.target , result.toast_title );
						functions_list[ type ]( result.toast_title , speed , function( res ){
							result.after_callback( result.target );
						} );
						result.done_callback( result.target );
					};
					break;
			}
			return result;
		}, handle_callback = function( func ){
			var error_callback = function(){
				result = eval( 'new Function( " return '+ func +'" )' );
			},result;
			tool.handle_try( error_callback , function(){
				!tool.is_function( result = w[ func ] ) && error_callback() ;
			});
			return result;
		}, functions = function(){
			this[ 0 ] = function( target , speed , callback , bn ){
				if( !!bn )
					$( target ).fadeIn( speed , callback );
				else
					$( target ).fadeOut( speed , callback );
			};
			this[ 1 ] = function( show_target , hide_target , speed , callback ){
				$( hide_target ).fadeOut( 0 );
				$( show_target ).fadeIn( speed , callback );
			};
			this[ 2 ] = function( url , callback , param ){
				var method = default_config.default_load_method;
				ajax({
					url : url,
					param : param,
					type : method,
					success : function( res ){
						callback( res );
					},
					error : function(){
						callback();
					}
				})
			};
			this[ 3 ] = function( url , method , data , callback ){
				ajax({
					url : url,
					type : method,
					data : data,
					success : function( res ){
						callback( res );
					},
					error : function(){
						callback();
					}
				})
			};
			this[ 4 ] = function( title , speed , callback ){
				toast({
					time : speed,
					title : title
				}).show( callback );
			}
		}, get_event_type = function( target ){
			return $( target ).attr( default_config.attr.change_event_type ) || default_config.default_event_type;
		}, get_group_key = function( target ){
			return $( target ).attr( default_config.attr.change_group_key ) || default_config.default_group_key;
		}, get_change_type = function( target ){
			var functions_attr = default_config.attr.functions,
				functions_list = default_config.functions
			return functions_list[ $( target ).attr( functions_attr ) ];
		}, get_change_target = function( target ){
			return $( target ).attr( default_config.attr.change_target );
		}, get_change_index = function( target ){
			var num = $( target ).attr( default_config.attr.change_index );
			if( num )
				return num - 0;
			return u;
		}, get_change_target_class = function( target ){
			return $( target ).attr( default_config.attr.change_target_class ) || '';
		}, get_change_start_callback = function( target ){
			return handle_callback( $( target ).attr( default_config.attr.change_start_callback ) );
		},get_change_done_callback = function( target ){
			return handle_callback( $( target ).attr( default_config.attr.change_done_callback ) );
		},get_change_after_callback = function( target ){
			return handle_callback( $( target ).attr( default_config.attr.change_after_callback ) );
		}, get_ajax_url = function( target ){
			return $( target ).attr( default_config.attr.ajax_url ) || '';
		}, get_ajax_param = function( target ){
			return $( target ).attr( default_config.attr.ajax_param ) || '';
		}, get_ajax_data = function( target ){
			return $( target ).attr( default_config.attr.ajax_data ) || '';
		}, get_ajax_method = function( target ){
			return $( target ).attr( default_config.attr.ajax_method ) || default_config.default_load_method;
		}, get_toast_title = function( target ){
			return $( target ).attr( default_config.attr.toast_title ) || '';
		}, set_active = function( target ){
			return $( target ).addClass( default_config.active_class );
		}, remove_active = function( target ){
			return $( target ).removeClass( default_config.active_class );
		}, has_active = function( target ){
			return $( target ).hasClass( default_config.active_class );
		}, init_style_rules = function(){
			if( style )
				return;
			return tool.each( default_config.styleRules , function(){
				style = set_style_rules(this);
			} , true );
		},
		callback,fn,self;
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					init_style_rules();
					self = this;
					this.args = handle_arguments( json );
					this.context = this.args.context;
					this.speed = this.args.speed;
					this.handle_change_target();
					this.handle_event_callback();
					return this;
				},
				handle_change_target : function(){
					this.trigger_target = query_trigger_target( this.context , this.speed );
					return this;
				},
				handle_event_callback : function(){
					var type,change_type,group_key;
					tool.each( this.trigger_target , function( key , value ){
						type = key;
						tool.each( value , function( key , value ){
							change_type = key;
							tool.each( value , function( key , value ){
								group_key = key;
								value.forEach(function( value , key ){
									$( value.target ).on( type , function(){
										value.callback();
									} )
								})
							} )
						} , true )
					} , true );
					return this;
				},
				err : function( arr ){
					return err( this.err_code , arr ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						default :
							if( !tool || !$ || !putty && false === check_putty() || !lang || !set_style_rules || !ajax ){
								this.err_code = 1001;
								if( !tool )
									this.err( [ 'tool.js' ] );
								if( !$ )
									this.err( [ 'define_jquery.js' ] );
								if( !putty && false === check_putty() )
									this.err( [ 'putty.js' ] );
								if( !lang )
									this.err( [ 'lang.js' ] );
								if( !set_style_rules )
									this.err( [ 'set_style_rules.js' ] );
								if( !ajax )
									this.err( [ 'ajax.js' ] );
							}
							break;
					}
					return this;
				}
			},
			new callback().init();
	}
}( window , void( 0 ) )) , ['tool' , 'toast' , 'ajax' , 'set_style_rules' , 'jquery' , 'putty' , 'lang'] );