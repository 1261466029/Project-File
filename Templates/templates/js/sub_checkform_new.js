!function( $ , u , w ){
	
	$.fn.extend({
		
		checkForm : function( context ){
			
			var jq = $(),
				tool = jq.tool(),
				
				callback = function(){
					
					return new callback.ii.it();
					
				},
				
				self,
				
				default_config = {
					
					monthList : {'january':'01','jan.':'01','jan':'01','february':'02','feb.':'02','feb':'02','march':'03','mar.':'03','mar':'03','april':'04','apr.':'04','apr':'04','may':'05','june':'06','jun.':'06','jun':'06','july':'07','jul.':'07','jul':'07','august':'08','aug.':'08','aug':'08','september':'09','sep.':'09','sep':'09','sept.':'09','sept':'09','october':'10','oct.':'10','oct':'10','november':'11','nov.':'11','nov':'11','december':'12','dec.':'12','dec':'12'},
					
					regList : {

						'check_file_image' : /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,
						
						'check_date_format' : /(\d{4})|(\d{1,2})|([a-zA-Z\.]{3,})/g,
						
						'check_time_format' : /\d{1,2}/g,

						'handle_time_format' : /(\d{1,2})\s*\:\s*(\d{1,2})\s*\:\s*(\d{1,2})/,

						'check_telnumber_format' : /^(((\+\d+)?|(\(\+?\d+\))?)((\s*(\-|\.)?(\s*\d)+)+)+)$/,

						'check_mail' : /^\w+@\w+\.\w+(\.\w+)?$/,
						
						'check_four_number' : /^\d{4}$/,
						
						'check_month_format' : /^((0?\d)|(1[012]))$/,
						
						'check_day_format' : /^((0?\d)|([12]\d)|(3[01]))$/,
						
						'check_hour_format' : /^(0?\d|1\d|2[0123])$/,
						
						'check_m_s_fotmat' : /^(0?\d|1\d|2[0123])$/,

						'trim' : /\s*/g
						
					},
					
					checkCallback : {
						
						testDate : function( arg ){

							var config = default_config,
								monthList = config.monthList,
								regList = config.regList,
								check_date_format = regList.check_date_format,
								check_four_number = regList.check_four_number,
								check_month_format = regList.check_month_format,
								check_day_format = regList.check_day_format,
								result = arg.match( check_date_format ),
								date = [ '0000' , '00' , '00'],
								length,
								last,
								index,
								key;

							if( !result )

								return;

							result = [ result[0] , result[1] , result[2] ];

							length = result.length;

							last = length - 1;

							if( last <= 0 )

								return;

							index = check_four_number.test( result[0] ) ? 0 : ( check_four_number.test( result[ last ] ) ? last : u );

							if( index == u )

								return;

							date[0] = result[ index ];

							result.splice( index , 1 );
							
							tool.array_walk( result , function( okey , ovalue ){
								
								key = (ovalue + '').toLowerCase();

								if( monthList[ key ] ){

									date[1] = monthList[ key ];

									result.splice( okey , 1 );

									return false;

								}
								
							} , true );

							if( date[1] - 0 === 0 ){

								index = index == 0 ? index : index - 1;

								date[1] = result[ index ];

								if( !check_month_format.test( date[1] ) )

									return;

								result.splice( index , 1 );

								date[1] = date[1] < 10 ? '0' + (date[1] - 0) : date[1]-0+'';

							}

							result[0] = parseInt(result[0]);

							if( check_day_format.test( result[0] ) )

								date[2] = result[0] < 10 ? '0' + (result[0] - 0) : result[0]-0+'' ;

							else

								return ;

							return ( date = new Date( date.join( '/' ) ) ),
							
									date == 'Invalid Date' ? 
									
										u :

										(function( d ){
											
											var data = [ d.getFullYear() , d.getMonth() , d.getDate() ];
											
											return 	(data[0] = data[0] < 10 ? '0' + (data[0] - 0) : data[0]-0+''),
									
												    (data[1] = data[1] < 9 ? '0' + (data[1] - 0 + 1 ) : data[1]-0 + 1 +''),
									
													(data[2] = data[2] < 10 ? '0' + (data[2] - 0) : data[2]-0+''),
													
													data.join('-');
													
											
										})( date );

						},
						
						testTime : function( arg ){
							
							var config = default_config,
								regList = config.regList,
								check_time_format = regList.check_time_format,
								check_hour_format = regList.check_hour_format,
								check_m_s_fotmat = regList.check_m_s_fotmat,
								result = arg.match( check_time_format ),
								data;

							if( result === u )

								return;
								
							( result.length = 3 ) &&
							
								tool.array_walk( result , function( key , value ){
									
									result[ key ] = value || '00';
									
								} , true );

							if( check_hour_format.test( result[0] ) && check_m_s_fotmat.test( result[1] ) && check_m_s_fotmat.test( result[2] ) )

								data = [ result[0] < 10 ? '0' + ( result[0] - 0 ) : result[0] - 0 , result[1] < 10 ? '0' + ( result[1] - 0 ) : result[1] - 0 ,  result[2] < 10 ? '0' + ( result[2] - 0 ) : result[2] - 0  ];

							return data ? data.join(':') : data;
							
						} ,

						testDateTime : function( arg ){

							var config = default_config,
								callback = config.checkCallback,
								regList = config.regList,
								handle_time_format = regList.handle_time_format,
								result = arg.match( handle_time_format ),
								index = result ? result.index : u,
								length,
								temp = [],
								data = [];

							if( index === u )

								return;

							length = result[0].length;

							temp = [ arg.split( result[0] ).join('') , result[0] ];

							data[0] = callback.testDate( tool.trim( temp[0] ) );

							data[1] = callback.testTime( tool.trim( temp[1] ) );

							if( data[0] && data[1] )

								return data.join( ' ' );

						} ,

						testTelNumber : function( arg ){

							var config = default_config,
								callback = config.checkCallback,
								regList = config.regList,
								check_telnumber_format = regList.check_telnumber_format,
								trim = regList.trim,
								result,
								data;

							data = arg.match( check_telnumber_format );

							if ( data == null )

								return;

							result = [

								data[2] ? data[2] : '',

								data[5] ? data[5] : '',

								data[6] ? data[6] : ''

							].join( '' ).replace( trim , '' );

							if ( result && result.length > 0 )

								return result;

						} ,

						testEmail : function( arg ){

							return default_config.regList.check_mail.test( arg ) ?

								arg : u;

						} ,

						testPicFile : function( arg ){

							var target = $( this ),
								files = target.prop( 'files' ),
								windowURL = window.URL || window.webkitURL,
								config = default_config,
								regList = config.regList,
								check_file_image = regList.check_file_image,
								result = [];

							if( !files || !files.length )

								return;

							tool.array_walk( files , function( key , value ){

								if( check_file_image.test( value.type ) ){

									var img = new Image();

									img.src = windowURL.createObjectURL( value );

									result.push( {

										obj : img,

										name : value.name,

										time : value.lastModified,

										size : ( value.size / 1000000 ).toFixed( 2 ) + 'MB',

										type : value.type

									} );

								} else {

									result = [];

									return false;

								}

							} , true );

							return result.length == 0 ? u : result;

						},

						testEmpty : function( arg ){

							return arg.length > 0 ?

								arg : u;

						}

					}
				
				},

				default_context = 'body',

				err_code = {

					0 : '未找到 - 指定表单元素 - 请检查节点是否存在'

				},

				err = function( code ){

					throw new Error( err_code[ code ] || err_code[ 0 ] );

				},

			check_array_name = function( name ){

				var index;

				return index = name.indexOf( '[]' ),

					index == -1 || index == 0 || index + 2 != name.length ?

						false : true;

			},

			handle_unit = function( context ){

				var forms = $( context.find( 'form' ) ),
					result = [],
					typeList = {

						0 : 'checkbox',

						1 : 'txt'

					},
					create_format = function( name , value , obj , list ){

						return list = list || {length:0},list.name = name,list.value = value,list[ list.length ++ ] = obj,list;

					},
					type,
					more_value,
					target,
					name;

				return forms.each(function( key , value ){

					tool.array_walk( $( value ).attr( 'data-index' , target = result[ result.push({}) - 1 ] ).prop( 'elements' ) , function( okey , ovalue ){

						name = ovalue.name;

						type =  ovalue.type == 'checkbox' || ovalue.type == 'radio' ?

							typeList[ 0 ] : typeList[ 1 ];

						( target[ name ] = target[ name ] || {length:0} )[ target[ name ].length ++ ] = {

							type : type,

							value : type == typeList[ 0 ] && !ovalue.checked ?

								u :

								ovalue.value,

							obj : ovalue

						};

					} , true );

				}) , result;

			},

			handle_context = function( context ){

				var jq_context = $( context );

				return jq_context.length ?

					jq_context : $( default_context );

			},

			handle_form_unit = function( formUnit , checkCallback , typeList , success , fail ){

				var list = tool.is_object( typeList ) ?

					typeList : {},

					success_callback = tool.is_function( success ) ?

					success : new Function(),

					fail_callback = tool.is_function( fail ) ?

					fail : new Function(),

					formValue,

					data;

				tool.array_walk( formUnit , function( key , value ){

					tool.array_walk( list , function( in_key , in_value ){

						if( value[ in_key ] ){

							data = tool.create$();

							tool.array_walk( value[ in_key ] , function( o_key , o_value ){

								data[ data.length ++ ] = o_value.obj;

								( formValue = check_value( o_value.value , o_value.obj , in_value , checkCallback ) ) ?

									success_callback( in_key , o_value.obj , formValue , data , key , {success:success,fail:fail} ) :

									fail_callback( in_key , o_value.obj , o_value.value , data , key , {success:success,fail:fail} ) ;

							} , true );

						}

					} , true );

				} , true );

			},

			check_value = function( str , obj , arg2 , checkCallback ){

				var result,
					status = 0;

				return result = tool.is_string( arg2 ) && checkCallback[ arg2 ] && ++ status ?

					checkCallback[ arg2 ].call( obj , str ) :

					(

						tool.is_regexp( arg2 ) && ++ status ?

							(

								arg2.test( str ) ?

									arg2 : u

							) :

							(

								tool.is_function( arg2 ) && ++ status ?

									arg2.call( obj , str ) :

									u

							)

					) ,

					status == 0 ?

						checkCallback[ 'testEmpty' ].call( obj , str ) :

						result;

			};
				
			callback.ii = callback.prototype = {
				
				constructor : callback ,
				
				it : function(){
					
					self = this;

					this.context = handle_context( context );

					this.formUnit = handle_unit( this.context );
					
					return this;
					
				},

				handle_callback : function( success , fail ){

					if( tool.is_function( success ) && tool.is_function( fail ) ){

						this.success = success;

						this.fail = fail;

					}

					return this;

				},

				check : function( type, success , fail ){

					handle_form_unit( this.formUnit , default_config.checkCallback , type , success || this.success , fail || this.fail );

					return this;

				}
				
			};
			
			callback.ii.it.prototype = callback.ii;
			
			return callback();
			
		}
		
	});
	
}( jQuery , void(0) , window );