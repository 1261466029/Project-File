!function(){

    $.fn.extend({

        tool : function(){

            var tool = function(){

                return new tool.ii.init();

            },self;

			var set_isOnly = function( okey , context , target , ovalue , isrec ){

				var json = {};

				json[ okey ] = ovalue;

				target = self.is_string( target ) ? target : '';

				if( !self.is_object( context ) )

					return;

				if( !isrec ){

					if( !target )

						self.array_walk( context , function( key , value ){

							if( self.is_object( value ) )

								return;

							Object.defineProperty( context , key , json );

						});

					else if( !self.is_object( context[ target ] ) )

						Object.defineProperty( context , target , json );

				} else {

					if( !target )

						(function( pa ){

							var callback = arguments.callee;

							self.array_walk( pa , function( key , value ){

								if( self.is_object( value ) ){

									if( Object.keys( value ).length > 0 )

										callback( value );

									return;

								} else

									Object.defineProperty( pa , key , json );

							});

						})( context );

					else

						(function( pa ){

							var callback = arguments.callee;

							self.array_walk( pa , function( key , value ){

								if( key == target && !self.is_object( value ) )

									Object.defineProperty( pa , key , json );

								if( self.is_object( value ) && Object.keys( value ).length > 0 ){

									callback( value );

									return;

								}

							});

						})( context );

				}

			};

            tool.prototype = tool.ii = {

                constructor : tool,

                init : function(){

					self = this;
					
					return self;

                } ,
				
				//判断浏览器是ie
				is_IE : function(){
					
					var userAgent = navigator.userAgent,
						vision = navigator.appVersion.match( /MSIE\s*([0-9]+\.[0-9]+)(?=\;)/ );
					
					if (!!window.ActiveXObject || "ActiveXObject" in window)

						return vision[ 1 ] - 0;

					else if (userAgent.indexOf("Edge") > -1)
						
						return "Edge";

					else 
				
						return false;
					
				},
				
				//判断是否是正则表达式
				is_regexp : function( reg ){
					
					return Object.prototype.toString.call( reg ) == '[object RegExp]';
					
				},
			
				//判断是否为字符串
				is_string : function( str ){
					
					return typeof str == 'string';
					
				},
				
				//判断是否为数组或对象
				is_object : function( obj ){
					
					return typeof obj == 'object' && obj != null;
					
				},
				
				//判断是否为数组
				is_array : function( arr ){
					
					return Object.prototype.toString.call( arr ) == '[object Array]';
					
				},
				
				//判断是否是 正则表达式
				is_reg : function( reg ){
					
					return Object.prototype.toString.call( reg ) == "[object RegExp]";
					
				},
				
				//判断是否是function
				is_function : function( func ){
					
					return typeof func == 'function';
					
				},
				
				//判断是否为数字
				is_number : function( num ){
					
					return typeof num == 'number' && !isNaN( num );
					
				},

				//判断是否是 dom
				is_dom : function ( dom ) {

					return dom instanceof HTMLElement;

				},

					//对集合进行循环执行回调函数
                array_walk : function( target , callback , bl ){

                    if( !self.is_object( target ) || typeof callback != 'function' )
		
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
				
				//生成一个dom对象
				create_nodes : function( node , json , txt ){
				
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
					
					var obj,
						result =  '',
						html = '';
					
					if( node && !self.is_string( node ) )
						
						return ;
						
					obj = self.is_object( json ) ? json : {};
					
					html = self.is_string( txt ) || self.is_number( txt ) ? txt + '</' + node + '>' : '';
						
					self.array_walk( obj , function( key , value ){
						
						if( !self.is_string( value ) )
							
							return;
						
						result += ( ' ' + key + '="' + value + '"' );
						
					} , true );
					
					return $('<' + node + result + '>' + html );
					
				},
			
				//生成一个空的jquery对象
				create$ : function(){
					
					var obj = $();
					
					obj.length = 0;
					
					obj.selector = 'create new nodeList';
					
					return obj;
					
				},	
			
				//生成一个实例
				create_construct : function( json ){
					
					var argu = self.is_object( json ) ? json : {},
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
					
					console.log( argu );
					
					self.array_walk( argu.inherit_attr , function( key , value ){
						
						ii[ key ] = value;
						
					} , true );
					
					result = new object();
					
					self.array_walk( argu.attr , function( key , value ){
						
						result[ key ] = value;
						
					} , true );
					
					return result;
					
				},		
				
				//合并为一个集合
				assign : function( arr1 , arr2 , bl ){
		
					var create_arr = function( content , index ){
						
							var arr = [];
						
							return arr[ index ] = content , arr ; 
						
						},
						length = 0,
						_arr1 = self.is_object( arr1 ) ? arr1 : create_arr( arr1 , length ++ ),
						_arr2 = self.is_object( arr2 ) ? arr2 : create_arr( arr2 , length ++ ),
						result = self.deep_copy( _arr1 , true , true ),
						_bl = bl == true ? bl : false;
						
					if( length == 2 )
						
						_bl = true;
						
					self.array_walk( _arr2 , function( key , value ){
							
						if( !( result[ key ] != undefined && _bl ) )
								
							result[ key ] = value;
						
					} , true );
					
					return result;
					
				},
				
				//去除空格
				trim : function( str ){
					
					return ( self.is_string( str ) ? str : '' ).replace( /(^\s+)|(\s+$)/g , '' );
					
				},

				//生成一个随机数
                rand : function( min , max , number ){

                    var result = Math.random() * ( max - min ) + min;

                    if( number == undefined )

                        return result;

                    return result.toFixed( number - 0 ) - 0;

                } ,

				//生成一个整形随机数
                int_rand : function( min , max ){

                    return self.rand( min , max , 0 );

                } ,

				//把一个数组转变成对象
                to_object : function( obj ){

                    var result = {};
					
					self.array_walk( obj , function( key , value ){
						
						result[ key ] = value;
						
					} , true );

                    return result;

                } ,

				//把一个对象转变成一个数组,其每一个值的形式为[key,value];
				to_array : function( obj ){
					
					var num = 0,
						result = [];
					
					self.array_walk( obj , function( key , value ){
						
						result.push( [key,value] )
						
					} , true );
					
					return result;
					
				},
				
				//深拷贝
				deep_copy : function( data , bl , r ){
		
					if( !self.is_object( data ) )
						
						return data;
						
					var result = {},
						i = 0,
						bl = bl == true ? bl : false,
						r = r == true ? r : false,
						length;
						
					if( self.is_array( data ) ){
						
						result = [];
						
						length = data.length;
						
					}
					
					!r ? !function(){
						
						if( length )
							
							for( ; i < length ; i ++ ){
								
								result[ i ] = data[ i ];
								
							}
							
						else if( bl )
							
							for( i in data ){
								
								if( !data.hasOwnProperty( i ) )
								
									continue;
									
								result[ i ] = data[ i ];
							
							}
							
						else
							
							for( i in data ){
								
								result[ i ] = data[ i ];
								
							}
						
					}()
						
					:
					
						!function(){
						
							if( length )
								
								for( ; i < length ; i ++ ){
									
									result[ i ] = self.deep_copy( data[ i ] , bl , r  );
									
								}
								
							else if( bl )
								
								for( i in data ){
									
									if( !data.hasOwnProperty( i ) )
									
										continue;
										
									result[ i ] = self.deep_copy( data[ i ] , bl , r  );
								
								}
								
							else
								
								for( i in data ){
									
									result[ i ] = self.deep_copy( data[ i ] , bl , r  );
									
								}
							
						
						}();
					
					return result;
					
				},

				//把一个集合颠倒排列
                reverse : function( obj ){

                    var result = {};

                    self.array_walk( obj , function( key , value ){

                        result[ value ] = key;

                    } , true );

                    return result;

                },
				
				//自定义的 兼容的 ES6 Map 函数
				Map : function(){
					
					var _Map = function(){},
						keys = [],
						values = [];
					
					_Map.prototype = {
					
						constructor : _Map,
						
						set : function( key , value ){
							
							if( this.has( key ) )
								
								return false;
						
							keys.push( key );
							
							values.push( value );
						
						},
						
						get : function( key ){
						
							var result;
							
							this.foreach( function( k , v ){
							
								if( k == key ){
								
									result = v;
								
									return false;
								
								}
							
							} );
							
							return result;
						
						},
						
						has : function( key ){
							
							if( this.get( key ) )
								
								return true;
								
							return false;
							
						},
						
						remove : function( key ){
							
							self.array_walk( keys , function( okey , ovalue ){
							
								if( key == ovalue ){
									
									values.splice( okey , 1 );
									
									keys.splice( okey , 1 );
									
									return false;
									
								}
							
							});
							
						},
						
						foreach : function( callback ){
						
							if( typeof callback != 'function' )
							
								return ;
								
							self.array_walk( keys , function( key , value , target ){
							
								return callback( value , values[ key ] , target );
							
							});
						
						},
						
						keys : function(){
							
							return keys;
						
						},
						
						values : function(){
						
							return values;
						
						},
						
						lengths : function(){
							
							return values.length;
							
						}
					
					};

					return new _Map();

				},
				
				//设置是否只读
				set_isOnlyRead : function( context , target , OnlyRead , isrec ){

					OnlyRead = OnlyRead ? true : false;
					
					set_isOnly( 'writable' , context , target , OnlyRead , isrec );
					
				},

				//设置它的值,并且让他隐藏
				set_Value : function( context , target , Value , isrec ){

					set_isOnly( 'value' , context , target , Value , isrec );

				},

				//设置它是否可被枚举
				set_isEnumer : function( context , target , enumer , isrec ){

					enumer = enumer ? true : false;

					set_isOnly( 'enumerable' , context , target , enumer , isrec );

				},

				//设置它的get属性
				set__get__ : function( context , target , __get__ , isrec ){

					if( typeof __get__ != 'function' )

						return ;

					set_isOnly( 'get' , context , target , __get__ , isrec );

				},

				//设置它的set属性
				set__set__ : function( context , target , __set__ , isrec ){

					if( typeof __set__ != 'function' )

						return ;

					set_isOnly( 'set' , context , target , __set__ , isrec );

				},
				
				//构造器 页面初始化 模型代码
				modal_init :  function(){
		
					var func = function(){};
					
					func.prototype = {
						
						'constructor' : func,
						
						'defined' : function( key , value ){
							
							var _this = this;
							
							this[ key ] = self.is_function( value ) 
							
								? function( e1 , e2 , e3 , e4 , e5 ){return value.call( self , e1 , e2 , e3 , e4 , e5 );} 
								
								: value;
							
						}
						
					};
					
					return new func();
					
				}

			};

            tool.ii.init.prototype = tool.ii;

            return tool();

        }

    });

}();