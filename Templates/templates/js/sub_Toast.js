(function(){
	
	$.fn.extend({
		
		showToast : function( json , config , context ){
			
			var callback = function(){
				
				return new callback.ii.init();
				
			},
			self,
			
			//Static Function List
			isString = function( string ){
				
				return typeof string == 'string';
				
			},
			
			isObject = function( object ){
				
				return typeof object == 'object' && object != null;
				
			},
			
			isNumber = function( num ){
				
				return typeof num == 'number' && !isNaN( num );
				
			},
			
			array_walk = function( target , callback , bl ){

				if( !isObject( target ) || typeof callback != 'function' )
	
					return ;
					
				var num = 0,
					length = target.length,
					_bl = bl == true ? bl : false,
					change_num = function( _num ){
					
						if( is_number( _num ) )
						
							return num += _num;
							
						return num;
					
					},
					value;
					
				if( length )
				
					for( ; num < length ; num ++ ){
					
						value = target[ num ];
					
						if( false == callback( num , value , target , change_num ) )
						
							return [ num , value ];
					
					}
					
				else if( _bl )
				
					for( num in target ){
					
						value = target[ num ];
						
						if( !target.hasOwnProperty( num ) )
						
							continue;
							
						if( false == callback( num , value , target , change_num ) )
						
							return [ num , value ];
					
					}
				
				else 
				
					for( num in target ){
					
						value = target[ num ];
						
						if( false == callback( num , value , target , change_num ) )
						
							return [ num , value ];
					
					}

			},
			
			create_nodes = function( node , json ){
				
				//json 格式
				//{
				//
				//	txt : txt,
				//
				//	style : style,
				//
				//	className : className
				//
				//}
				
				var object,
					result = {
						
						txt : '',
						
						style : '',
						
						className : '',
						
						data : ''
						
					};
				
				if( !node )
					
					return ;
					
				object = isObject( json ) ? json : {};
					
				array_walk( object , function( key , value ){
					
					result[ key ] = isString( value ) ? value : '' ;
					
					if( key == 'style' )
						
						result[ key ] = ( 'style="' + result[ key ] + '"' );
						
					else if( key == 'className' )
						
						result[ key ] = ( 'class="' + result[ key ] + '"' );
						
					result[ key ] = ' ' + result[ key ];
					
				} , true );
				
				return '<' + node + result.style + result.className + result.data + '>' + result.txt + '</' + node + '>';
				
			},
			
			create_div = function( json ){
				
				return create_nodes( 'div' , json );
				
			},
			
			create_Object = function( json ){
				
				var argu = isObject( json ) ? json : {},
					object = function(){},
					ii,
					result;
					
				ii = object.prototype = {constructor : object};
				
				ii.__get__ = function( key ){
					
					return ii[key];
					
				};
				
				ii.__set__ = function( key , value ){
					
					ii[ key ] = value;
					
				};
				
				array_walk( argu.inherit_attr , function( key , value ){
					
					ii[ key ] = value;
					
				} , true );
				
				result = new object();
				
				array_walk( argu.attr , function( key , value ){
					
					result[ key ] = value;
					
				} , true );
				
				return result;
				
			},
			
			deep_copy = function( obj , bl ){

				return (function( obj ){

					var argument = {},
						arguCallee = arguments.callee;

					if( !isObject( obj ) )

						return obj;

					if( obj.constructor.name == 'Array' )

						argument = [];

					array_walk( obj , function( key , value ){

						if( typeof value == 'object' && value != null )

							argument[ key ] = arguCallee( value );

						else

							argument[ key ] = value;

					} , bl );

					return argument;

				})( obj )

			},
			
			assign = function( target , value ){
				
				var _target = isObject( target ) ? target : {},
					_value = isObject( value ) ? value : {};
				
				array_walk( _value , function( in_key , in_value ){
					
					_target[ in_key ] = in_value;
					
				} , true );
				
				return _target;
				
			},
			
			create$ = function(){
				
				var obj = $();
				
				obj.length = 0;
				
				obj.selector = 'create new nodeList';
				
				return obj;
				
			},
			
			out_time_callback = function( callback , time ){
				
				return setTimeout(function(){
					
					callback();
					
				} , time );
				
			},
			
			//Private Function List
			HeadleArguments = function( json , _default ){
				
				var head,
					body,
					btns,
					result = {};
					
				if( !isObject( json ) )
					
					return;
					
				result.background = json.background || _default.background;
					
				result.content = json.content || _default.content;
					
				result.head = json.head || _default.head;
				
				result.body = json.body || _default.body;
				
				result.btns = json.btns || _default.btns;
				
				result = Change_structure( result , _default );
				
				return result;
				
			},
			
			HeadleTime = function( time ){
				
				var _time = time - 0;
				
				if( isNumber( _time ) )
					
					return _time;
					
				return 0;
				
			},
			
			HeadleContext = function( context ){
				
				var _context = $( context );
				
				if( _context.length )
					
					return _context;
					
				return $( 'body' );
				
			},
			
			assign_json = function( key , value ){
				
				switch( key ){
					
					case 'time':
					
						return HeadleTime( value );
						
					case 'hover':
					
						return value  == true ? true : false ;
					
				}
				
			},
			
			HeadleConfig = function( config , _default ){
				
				var result = {},
					_config = isObject( config ) ? config : {};
				
				array_walk( _default , function( key , value ){
					
					result[ key ] = assign_json( key , _config[ key ] ) || value;
					
				} , true );
				
				return result;
				
			},
			
			Change_structure = function( json , _default ){
				
				var headleJSON = {},
					HTML = '';
				
				array_walk( json , function( key , value ){
					
					headleJSON[ key ] = {};
					
					if( !isObject( value ) ){
						
						HTML = deep_copy( _default[ key ] );
						
						HTML.title = value;
						
					} else 
						
						HTML = value;
						
					if( _default[ key ].checkbox ){
						
						headleJSON[ key ] = [];
						
						if( HTML.length )
							
							array_walk( HTML , function( in_key , in_value ){
								
								headleJSON[ key ].push( GetRelevant( in_value , _default[ key ] ) );
								
							} , true );
							
						else
							
							headleJSON[ key ].push( GetRelevant( HTML , _default[ key ] ) );
						
					} else 
						
						headleJSON[ key ] = GetRelevant( HTML , _default[ key ] );
					
				} , true );
				
				return headleJSON;
				
			},
			
			GetRelevant = function( json , _default ){
				
				var result = {};
				
				array_walk( _default , function( key , value ){
					
					result[ key ] = json[ key ] || value;
					
				} , true );
				
				return result;
				
			},
			
			CreateDom = function( json ){
				
				var css =  ( json._default_style || '' ) + ( json.style || '' ),
					color_css = json.color ? 'color:' + json.color + ';' : '',
					background_css = json.background ? 'background:' + json.background + ';' : '',
					title = isString( json.title ) ? json.title : '',
					className = isString( json.className ) ? json.className : '',
					callback = json.callback,
					style = '',
					result;
					
				style = css + color_css + background_css;
				
				result = $( create_div({
					
					txt : title,
					
					style : style,
					
					className : className
					
				}) );
				
				if( typeof callback == 'function' )
					
					result.on( 'click' , callback );
				
				return result;
				
			},
			
			HeadleNodeList = function( json , _default ){
				
				var result = {};
				
				array_walk( json , function( key , value ){
					
					if( _default[ key ] )
						
						result[ key ] = _default[ key ]( value );
						
					else
						
						result[ key ] = _default.base( value );
					
				} , true );
				
				return result;
				
			},
			
			HeadleDomInit = function( list , callback ){
				
				var result = create_Object();
				
				result.background = callback.base( list.background );
				
				result.content = callback.container( [list.content] );
				
				return result;
				
			},
			
			createToast = function( nodeList , context ){
				
				var toast,
					content,
					_content;
				
				toast = nodeList.background.html;
				
				content = nodeList.content.html;
				
				_content = nodeList.content.__get__( 'html' );
				
				_content.append( nodeList.head.html );
				
				_content.append( nodeList.body.html );
				
				_content.append( nodeList.btns.html );
				
				toast.append( content );
				
				context.append( toast );
				
				toast.fadeIn( 500 );
				
				//Junde 临时改动

				if( !$().showToast.create_style && ( $().showToast.create_style = 1 ) )
				
					$( 'body' ).addClass( '_hide_toast_open' ).append("<style>._hide_toast_open{padding-right:17px;overflow:hidden;}</style>");
				
			}
			;
			
			
			callback.ii = callback.prototype = {
				
				constructor : callback,
				
				//Public Function List
				init : function(){
					
					var headle_json,
						nodeList,
						configList;
						
					self = this;
					
					this.number_unit = 100;
					
					this.status = 0;
					
					this._default_list = {
							
						background : create_Object({
							
							attr : {
							
								className : 'toast-background',
								
								background : 'rgba(0,0,0,.5)',
								
								_default_style : 'position:fixed;top:0;bottom:0;left:0;right:0;z-index:1000000000000;display:none;'
								
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						container : create_Object({
							
							attr : {
							
								className : 'toast-container',
							
								_default_style : 'display:table;width:100%;height:100%;'
								
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						row : create_Object({
							
							attr : {
							
								className : 'toast-row',
								
								_default_style : 'display:table-row;'
								
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						cell : create_Object({
							
							attr : {
								
								className : 'toast-cell',
								
								_default_style : 'display:table-cell;vertical-align:middle;text-align:center;'
								
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						content : create_Object({
							
							attr : {
							
							className : 'toast-content',
								
							background : '#fff',
							
							_default_style : 'border-radius:5px;width:300px;height:215px;margin:auto;overflow:hidden;box-shadow:0 0 5px #999;font-size:1rem;text-align:left;box-shadow:0 0 10px #000;'
								
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						head : create_Object({
							
							attr : {
							
								title : 'Alert',
								
								className : 'toast-head',
								
								color : '#fff',
								
								background : '#ff5400',
								
								_default_style : 'height:50px;line-height:50px;width:100%;text-indent:1.5rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:16px;'
									
							},
							
							inherit_attr : {
								
								checkbox : 0
								
							}
							
						}),
						
						body : create_Object({
							
							attr : {
							
								title : '...',
								
								className : 'toast-body',
								
								color : '#333',
								
								background : '#fff',
								
								_default_style : 'height:90px;font-size:14px;line-height:1.5;text-align:center;padding:0 5px;'
									
							},
							
							inherit_attr : {
								
								checkbox : 1
								
							}
							
						}),
						
						btns :create_Object({
							
							attr : {
									
								title : 'confirm',
								
								className : 'toast-btn',
								
								color : '#333',
								
								callback : $().closeToast,
								
								background : '#f4f4f4',
								
								_default_style : 'height:75px;margin:7.5px 15px;padding:5px 15px;display:inline-block;border-radius:2px;border:1px solid #ddd;text-align:center;cursor:pointer;font-size:14px;'
								
							},
							
							inherit_attr : {
								
								checkbox : 1
								
							}
							
						})
						
					};
					
					this._default_callback = function(){
							
						var callback = function(){
							
							var _this = this;
							
							this.base = function( json , key ){
								
								return create_Object({
									
									inherit_attr : {
										
										html : CreateDom( json )
										
									},
									
									attr : {
										
										html : CreateDom( json )
										
									}
									
								});
								
							};
							
							this.container = function( json , type ){
								
								var container = self._default_list.container,
									row = self._default_list.row,
									cell = self._default_list.cell,
									checkbox = create$();
									
								container = _this.base( container ).html;
								
								row = _this.base( row ).html;
									
								array_walk( json , function( key , value ){
									
									var _checkbox = _this.base( value ).html,
										_cell = _this.base( cell ).html;
									
									checkbox[ checkbox.length ++ ] = _checkbox[0];
									
									_cell.append( _checkbox );
									
									row.append( _cell );
									
								} , true );
								
								container.append( row );
								
								switch( type ){
									
									case 'body':
									
										container.height( checkbox.height() + 'px' );

										container.css( 'background' , checkbox.css( 'background' ) );
										
										checkbox.height( 'auto' ).css( 'background' , 'none' );
										
										break;
										
									case 'btns':
									
										container.height( checkbox.height() + 'px' );
										
										checkbox.height( 'auto' );
										
										break;
										
								}
								
								return create_Object({
									
									attr : {
										
										html : container
										
									},
									
									inherit_attr : {
										
										html : checkbox
										
									}
									
								});
								
							}
							
							this.checkbox = function( json , type ){
								
								return this.container( json , type );
								
							};
							
							this.btns = function( json ){
								
								return this.checkbox( json , 'btns' );
								
							};
							
							this.body = function( json ){
								
								return this.checkbox( json , 'body' );
								
							};
							
						};
						
						return new callback();
					
					};
					
					this._default_config = {
						
						time : 0,
						
						hover : 0,

						close_queue : false
						
					};
					
					this.context = HeadleContext( context );

					configList = HeadleConfig( config , this._default_config );

					if( configList.close_queue && $().showToast.status === 1 ){

						setTimeout(function(){

							self.init();

						},500);

						return;

					}

					$().showToast.status = 1;
					
					headle_json = HeadleArguments( json , this._default_list );
					
					nodeList = assign( HeadleDomInit( this._default_list , this._default_callback() ) , HeadleNodeList( headle_json , this._default_callback() ) );
					
					this.head = nodeList.head.html;
					
					this.body = nodeList.body.html;
					
					this.btns = nodeList.btns.__get__( 'html' );
					
					this.content = nodeList.content.__get__( 'html' );
					
					createToast( nodeList , this.context );
					
					this.hover( configList.hover );
				
					this.close( configList.time );
					
				},
				
				close : function( time ){
					
					var number_unit = self.number_unit,
						start_time = 0,
						callback = function(){
							
							if( self.status === 0 )
								
								start_time += number_unit;
								
							else if( self.status === 1 )
								
								start_time = 0;
							
							if( start_time < time ){
								
								out_time_callback( callback , number_unit );
								
								return;
								
							}
							
							$().closeToast();
							
						};
					
					if( time > 0 )
						
						out_time_callback( callback , number_unit );
					
				},
				
				hover : function( bl ){
					
					if( bl ){
						
						this.content.hover(function(){
						
							self.status = 1;
						
						},function(){
						
							self.status = 0;
					  
						});
						
					}
					
				}
				
			};
			
			callback.ii.init.prototype = callback.ii;
			
			return callback();
			
		}
		,
		closeToast : function(){
			
			$( '.toast-background' ).fadeOut( 500 , function(){
				
				$().showToast.status = 0;
				
				$( '.toast-background' ).remove();
				
				//Junde 临时改动
				
				$( 'body' ).removeClass( '_hide_toast_open' );
				
			} )
			
		}
	
	})
	
})();