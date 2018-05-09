<!DOCTYPE html>

<html>

<head>

<link rel="stylesheet" href="./bootstrap.min.css"/>

<style>

	.show_list_context{
		
		height: 480px;
		
		overflow-y: auto;
		
		border-bottom: 1px solid #ddd;
		
	}

	.show_list{
		
		float:left;
		
	}

	.mini_list{

	    position: absolute;

        bottom: 93px;

        width: 100%;

        left: 0;

	    height:0;

        overflow-x: auto;

        overflow-y: hidden;

        background-color: rgba(255,255,255,.9);

        white-space:nowrap;

        transition:all .5s;

        -webkit-transition:all .5s;

        -moz-transition:all .5s;

        -ms-transition:all .5s;

        -o-transition:all .5s;

	}

	.mini_list.show{

	    height:108px;

        border-top: 1px solid #ddd;

	}

	.mini_list.show+.show_btn{

	    display:none;

	}

	.mini_list+.show_btn{

	    display:block;

	    position:absolute;

	    bottom:100px;

	    right:15px;

	    width:25px;

	    height:25px;

	    border-radius:50%;

	    background-color:#999;

	    color:#fff;

	    line-height:25px;

	    text-align:center;

	    cursor:pointer;

	}

	.show_list:after,.show_list:before,.mini_list:after,.mini_list:before{
		
		content:'';
		
		display:block;
		
		clear:both;
		
	}

	.show_list .item.change_drag{

	    border:3px solid #ed6d00;

	}

	.show_list .item{

	    border:3px solid transparent;

	}

	.show_list .item.fill{

	    border:3px dotted #ddd;

	}

	.show_list .item img,.mini_list .item img{
		
		max-width:100px;
		
		margin:auto;
		
		display:block;
		
		max-height:100px;
		
		position:relative;
		
		border:3px solid #ddd;
		
	}

	.mini_list .item img{

	    max-width:50px;

	    max-height:50px;

	}
	
	.show_list .item,.mini_list .item{
		
		float:left;
		
		margin:15px;
		
		width:106px;
		
		height:106px;
		
		position:relative;
		
	}

	.mini_list .item{

		width:56px;

		height:56px;

		display:inline-block;

		float:none;

	}
	
	.show_list .item.fail img{
		
		border-color:transparent;
		
	}
	
	.show_list .item.success img{
		
		border-color:transparent;
		
	}
	
	.show_list .item.fail{
		
		border : 3px solid red;
		
	}
	
	.show_list .item.fail.fail_index_00:after{
		
		content:'용량제한 초과하였습니다.';
		
		color:red;
		
		position:absolute;
		
		top:100%;
		
		right:0;
		
		line-height:25px;
		
		font-size:12px;
		
		white-space:nowrap;
		
	}
	
	.show_list .item.fail.fail_index_01:after{
		
		content:'업로드 실패, 다시 시도해주세요';
		
		color:red;
		
		position:absolute;
		
		top:100%;
		
		right:0;
		
		line-height:25px;
		
		font-size:12px;
		
		white-space:nowrap;
		
	}
	
	.show_list .item.success{
		
		border : 3px solid green;
		
	}
	
	.show_list .item.success:after{
		
		content:'업로드 성공하였습니다.';
		
		color:green;
		
		position:absolute;
		
		top:100%;
		
		right:0;
		
		line-height:25px;
		
		font-size:12px;
		
		white-space:nowrap;
		
	}
	
	.count{
		
		position:absolute;
		
		bottom:0;
		
		left:0;
		
		width:100%;
		
	}
	
	.show_list>.item:hover .icon{
		
		bottom:0;
		
		padding-top:40px;
		
	}
	
	.show_list>.item.success:hover .icon{
		
		display:none;
		
	}
	
	.show_list>.item .icon,.mini_list .item .icon{
		
		position: absolute;
		
		top: 0;
		
		right: 0;
		
		bottom:100%;
		
		left:0;
		
		background-color: rgba(255,255,255,.8);
		
		color: #999;
		
		font-size: 16px;
		
		text-align: center;
		
		z-index: 100;
		
		overflow:hidden;
		
	}

	.show_list>.item.drag img{

	    /*animation:drag .2s ease 0s infinite;*/

	    border-color:#ed6d00;

	}

	.mini_list+.show_btn.none{

	    display:none;

	}

	@keyframes drag {

	    0%{

	        transform:rotateZ(0deg);

	    }
	   25%{

	        transform:rotateZ(-1deg);

	   }
	   75%{

	        transform:rotateZ(1deg);

	   }
	   100%{

	        transform:rotateZ(0deg);

	   }

	}

	@-webkit-keyframes drag {

	    0%{

	        transform:rotateZ(0deg);
	        -webkit-transform:rotateZ(0deg);

	    }
	   25%{

	        transform:rotateZ(-1deg);
	        -webkit-transform:rotateZ(-1deg);

	   }
	   75%{

	        transform:rotateZ(1deg);
	        -webkit-transform:rotateZ(1deg);

	   }
	   100%{

	        transform:rotateZ(0deg);
	        -webkit-transform:rotateZ(0deg);

	   }

	}

	@-moz-keyframes drag {

	    0%{

	        transform:rotateZ(0deg);
	        -moz-transform:rotateZ(0deg);

	    }
	   25%{

	        transform:rotateZ(-1deg);
	        -moz-transform:rotateZ(-1deg);

	   }
	   75%{

	        transform:rotateZ(1deg);
	        -moz-transform:rotateZ(1deg);

	   }
	   100%{

	        transform:rotateZ(0deg);
	        -moz-transform:rotateZ(0deg);

	   }

	}

	@-o-keyframes drag {

	    0%{

	        transform:rotateZ(0deg);
	        -o-transform:rotateZ(0deg);

	    }
	   25%{

	        transform:rotateZ(-1deg);
	        -o-transform:rotateZ(-1deg);

	   }
	   75%{

	        transform:rotateZ(1deg);
	        -o-transform:rotateZ(1deg);

	   }
	   100%{

            transform:rotateZ(0deg);
	        -o-transform:rotateZ(0deg);

	   }

	}

	@-ms-keyframes drag {

	    0%{

            transform:rotateZ(0deg);
	        -ms-transform:rotateZ(0deg);

	    }
	   25%{

            transform:rotateZ(-1deg);
	        -ms-transform:rotateZ(-1deg);

	   }
	   75%{

            transform:rotateZ(1deg);
	        -ms-transform:rotateZ(1deg);

	   }
	   100%{

            transform:rotateZ(0deg);
	        -ms-transform:rotateZ(0deg);

	   }

	}

	.show_list>.item.drag .icon{

        display:none;

	}
	
	.alert{
		
		position:absolute;
		
		bottom: 90px;
    
		right: 0;
		
	}
	
	.alert.none{
		
		height:0;
		
		opacity:0;
		
		overflow:hidden;
		
		margin:0;
		
		padding:0;
		
		border:0;
		
	}
	
	.alert.show{
		
		height:auto;
		
		opacity:1;
		
	}
	
	.detail.show{
		
		display:block;
		
	}
	
	.detail.hide{
		
		display:none;
		
	}
	
	.add_img_block{
		
		overflow:hidden;
		
	}
	
	.add_img_block input.get_file{
		
		position:absolute;
		
		z-index:-1;
		
		bottom:100%;
		
		right:100%;
		
	}
	
	.add_img{
		
		float: left;
		
		width: 106px;
		
		height: 106px;
		
		text-align: center;
		
		line-height: 100px;
		
		font-size: 100px;
		
		background-color: rgba(0,0,0,.5);
		
		color: #fff;
		
		cursor:pointer;
		
		margin: 15px;
		
	}
	
	#iframe{
		
		display:none;
		
	}
	

</style>

</head>

<body>

	<form id="send_file" style="overflow:hidden;">
	
		<label class="show detail">

			이미지 선택해주세요 :

			<div style="display: inline-block;padding: 5px;border: 1px solid #999;border-radius: 3px;cursor: pointer;">

				이미지 선택해주세요

			</div>

			<input type="file" id="file" style="display:none;" multiple="multiple" onchange="(function(target){init.show_list(target)})(this)"/>

		</label>
		
		<label class="hide detail">
		
			이미지 선택해주세요
		
		</label>
		
		<br/>
		
		<button style="float:right;display: block;padding: 5px;border: 1px solid #999;border-radius: 3px;background-color:#fff;" type="button" onclick="(function(){init.send_file()})()">
		
			업로드

		</button>
	
	</form>
	
	<div class="show_list_context">
	
		<div class="show_list">
			
		
		</div>
		
		<div class="hide detail add_img_block">
		
			<label>
			
				<span class="add_img">
			
					+
				
				</span>
					
				<input type="file" class="get_file" onchange="init.show_list(this);">
			
			</label>
		
		</div>
	
	</div>

	<div class="mini_list">

	</div>

	<div class="show_btn none" data-for="show_mini_list">

	    S

	</div>
	
	<div class="count">
	
		<div class="progress">
		  <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
			<span class="sr-only"><span data-show_value="0">0%</span> Complete (success)</span>
		  </div>
		</div>
	
		<span data-show_value="0">
		
			0%
		
		</span>
	
	</div>
	
	<div class="alert alert-warning alert-dismissible fade in none" role="alert">
	  
      <strong class="header"></strong> 
	  
	  <span class="content"></span>
	  
    </div>
	
	<iframe id="iframe" name="iframe_name">
	
	</iframe>

	<script src="./jquery.js">

	</script>

	<script>

		var ajax_url;

		$( window ).on( 'load' , function(){

				ajax_url = window.ajax_url;

		} );

	    var page = function(){

	        var page,
				context = '#send_file',
				target = context + ' #file',
				show_detail = $( '.detail.show' ),
				hide_detail = $( '.detail.hide' ),
				show_list = '.show_list',
				mini_list = '.mini_list',
				add_img_block = '.add_img_block',
				add_img_block_content = add_img_block + ' label',
				item = show_list + ' .item',
				target_iframe = '#iframe',
				target_iframe_name = 'iframe_name',
				dom_count = '.count',
				name = 'upload_image',
				show_btn = '.show_btn',
				alert_dom = '.alert',
				alert_header = alert_dom + ' .header',
				alert_content = alert_dom + ' .content',
				errCode = ['BROWSER버전 너무 낮습니다.','업로드 가능한 갯수에 초과하였습니다.(5개)','용량제한에 초과하였습니다.(1MB)'],
				config = {
					
					ajax : function(){
						
						return {
							
							type : 'string',
							
							url : 'string',
							
							data : 'object',
							
							success : 'function',
							
							fail : 'function'
							
						};
						
					},
					
					pic : {
						
						max_length : 5,
						
						max_size : 1 * 1024 * 1024
						
					},
					
					item : {
						
						fill_txt : '삭제'
						
					},
					
					alert : {
						
						time_length : 2000
						
					},
					
					change_status : {
						
						'arr' : {
							
							0 : 'fail_index_00',
							
							1 : 'fail_index_01'
							
						},
						
						'string' : 'fail_index_00 fail_index_01'
						
					},

					drag : {

					    'max_time_length' : 300,

					    'target' : item,

					    'className' : 'drag'

					}
					
				};

	        return page = function(){

	            this.data = [];

	        },
				page.prototype.err = function( status , bl ){
					
					var code = errCode[ !status || !errCode[ status ] ? 0 : status ];
					
					bl ? 
					
					this.alert( '' , code ) :
					
					alert( code );
					
				},
				page.prototype.init = function(){
					
					var vision = this.is_IE();
					
					self = this;
					
					if( vision && vision < 10 || !FileReader )
					
						this.browser_mode = 'ie',
					
						this.add_input_file = function( target ){
							
							setTimeout(function(){
								
								self.sort_input( self.create_add_img_input() )
								
							} , 0 );
							
						},
						
						show_detail.removeClass( 'show' ).addClass( 'hide' ),
						
						hide_detail.removeClass( 'hide' ).addClass( 'show' );
						
					$( window ).on( 'click' , function( e ){
						
						self.allot( 'click' , e );
						
					});

					$( window ).on( 'mousedown' , function( e ){

						self.allot( 'mousedown' , e );

					});

					$( window ).on( 'mousemove' , function( e ){

						self.allot( 'mousemove' , e );

					});

					$( window ).on( 'mouseup' , function( e ){

						self.allot( 'mouseup' , e );

					});
					
					$( target_iframe ).off( 'onload' ).on( 'load' , function(){
						
						self.iframe_submit( this );
						
					} );
						
					return this;
					
				},
				page.prototype.alert = function( header , content ){
					
					var _alert = $( alert_dom ),
						_header = $( alert_header ),
						_content = $( alert_content ),
						_config = config.alert,
						time_length = _config.time_length,
						show = 'show',
						none = 'none',
						self = this,
						callee = arguments.callee;
						
					if( this.alert.status == 1 ){
						
						setTimeout(function(){
							
							callee( header , content );
							
						} , time_length );
						
						return;
						
					}
					
					this.alert.status = 1;
						
					return _alert.removeClass( 'none' ).addClass( 'show' ),
					
					_header.html( header || 'Alert' ),
					
					_content.html( content || '' ),
					
					setTimeout(function(){
						
						_alert.addClass( 'none' ).removeClass( 'show' ),
					
						_header.html( '' ),
					
						_content.html( '' ),
						
						self.alert.status = 0
						
					} , time_length );
					
					_alert;
					
				},
				page.prototype.iframe_submit = function( target ){
					
					if( !this.target_iframe_callback )
						
						return ;
						
					var response = target.contentDocument.body.innerText;
					
					this.target_iframe_callback( response );
					
				},
				page.prototype.is_IE = function(){
					
					var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
					var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
					var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
					var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
					if(isIE) {
						var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
						reIE.test(userAgent);
						var fIEVersion = parseFloat(RegExp["$1"]);
						if(fIEVersion == 7) {
							return 7;
						} else if(fIEVersion == 8) {
							return 8;
						} else if(fIEVersion == 9) {
							return 9;
						} else if(fIEVersion == 10) {
							return 10;
						} else {
							return 6;//IE版本<=7
						}   
					} else if(isEdge) {
						return 'edge';//edge
					} else if(isIE11) {
						return 11; //IE11  
					}else{
						return false;//不是ie浏览器
					}
					
				},
	            page.prototype.setData = function( value ){

	                return this.data.push( value ),
	                    this.data;

	            },
	            page.prototype.is_object = function( obj ){

	                return 'object' == typeof obj && null != obj;

	            },
				page.prototype.is_array = function( arr ){
					
					return '[object Array]' == Object.prototype.toString.call( arr );
					
				},
	            page.prototype.is_number = function( num ){

	                return 'number' == typeof num && !isNaN( num );

	            },
	            page.prototype.is_function = function( func ){

	                return 'function' == typeof func;

	            },
	            page.prototype.each = function( obj , callback , bl ){

	                var length,i,result;

	                if( this.is_object( obj ) && this.is_function( callback ) ){

	                     if( this.is_number( length = obj.length ) )

                            for( i = 0 ; i < length ; i ++ ){

								if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

									break;

                            }

                         else if( !bl )

                             for( i in obj ){

                                 if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                                     break;

                             }

                         else

                             for( i in obj ){

                                 if( obj.hasOwnProperty( i ) && false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                                     break;

                             }

	                }

	                return result;

	            },
				
				page.prototype.toArray = function( data ){
					
					var arr = [];
					
					return this.each( data , function(){
						
						arr.push( this );
						
					}) , arr;
					
				},
				
				page.prototype.deep_copy = function( obj ){
					
					var result,
						self = this,
						callee = arguments.callee;
					
					result = !this.is_object( obj ) ?
					
						obj : 
						
						( 
					
							this.is_array( obj ) ? [] : {}
						
						);
						
					this.each( obj , function( key ,  value ){
						
						result[ key ] = callee.call( self , value );
						
					} , true );
					
					return result;
 					
				},
				
				page.prototype.assign = function( arr1 , arr2 ){
					
					var result = {};
					
					return this.is_object( arr1 ) && this.is_object( arr2 ) && ( result = this.deep_copy( arr1 ) ) ?
					
						this.each( arr2 , function( key , value ){
							
							result[ key ] = value;
							
						}) && result : result ,

						result;
					
				},
				
				page.prototype.ajax_file = function( formData , data , callback ){
					
					if( this.browser_mode == 'ie' ){
						
						if( self.fail( 'send_file' , data ) )
								
							self.target_iframe_callback = callback,
							
							$( formData ).appendTo( 'body' ).submit().remove();
						
						else
							
							callback() , 
					
							self.err( 2 , true );
							
						
					}else {
						
						if( self.fail( 'send_file' , data ) )
				
							$.ajax({
								
								url: ajax_url,
			 
								method: 'POST',
			 
								data: formData,
			
								contentType: false,
			
								processData: false,
			
								cache: false,
			
								success: function( res ) {
				
									callback( res )
			
								},
			
								error: function (error) {
									
									callback();
			
								}
			
							});
						
						else
							
							callback() , 
					
							self.err( 2 , true );
						
					}
					
				},
				page.prototype.send_file = function(){
					
					var files = this.this_data,
						get_files = {},
						_target,
						i = 0,
						self = this,
						length,
						fail_times = 0,
						callback = function( res , target_file , callee ){
							
							handle_response( res , target_file );
								
							callee();
							
							return ;
							
						},
						handle_response = function( res , target_file ){
							
							var response;
							
							try{
								
								response = JSON.parse( res );
								
							}catch( error ){
								
								response = res;
								
							}
							
							if( res ){
							
								self.getData().push([response,target_file.dom[2],target_file.dom[3]]);
								
								self.success_upload( target_file.index );
								
								/*self.each( files , function( key , value ){
									
									if( target_file.index == value.index ){
										
										self.this_all ++;
										
										self.clear( key );
										
										return false;
										
									}
									
								});*/
								
							} else {
								
								fail_times ++;

								if( self.ready_status )

								    self.change_status( $( target_file.dom[1] ) , 0 , 1 );
								
							}
							
						},
						handle_upload_img_data = function(){
							
							var create_form = function( url , method ){
								
									return self.create_form( url , method );
								
								},
								data;
							
							if( self.browser_mode == 'ie' )
								
								return function( file ){
									
									if( !file )
								
										return false;
										
									data = create_form( ajax_url , 'POST' );
								
									handle_form_data( data , file );	
							
									if( !data )
								
										return self.err();
									
									return data;
									
								};
								
							return function( file ){
									
								if( !file )
							
									return false;
								
								data = new FormData();
								
								handle_form_data( data , file );	
						
								if( !data )
							
									return self.err();
								
								return data;
								
							};
							
						}(),
						handle_form_data = (function(){
							
							if( self.browser_mode == 'ie' )
								
								return function( data , file ){
									
									file.name = name;
									
									$( data ).append( file );
									
								};
								
							return function( data , file ){
								
								data.append( name , file );
								
							};
							
						})();
						
					get_files = files.slice();
					
					length = files.length;
					
					(function(){
						
						var callee = arguments.callee,
							target_file;
						
						if( i < length && get_files[ i ] && get_files[ i ].files )
					
							self.ajax_file( handle_upload_img_data( ( target_file = get_files[ i ++ ] ).files ) , target_file , function( res ){
								
								callback( res , target_file , callee );
								
							});
							
						else
							
							self.this_all = fail_times;
						
					})();
					
				},
				page.prototype.show_list = function( target ){
					
					var data = ( this.this_data = this.this_data || [] ),
						getfile = function(){
							
							return new FileReader();
							
						},
						set_index = function( key ){
							
							return 'file_' + key;
							
						},
						upload = function(){

						    var index;
								
							self.each( data , function( key , value ){

								value.index = key;

								$( $( value.dom[1] ).attr( 'id' , index = set_index( key ) ).children( '.icon' ) ).attr( 'data-change_target' , index );

								value.dom[3] = set_index( key );

							});

						},
						_target_files = [],
						_config = config.pic,
						max_length = _config.max_length,
						done_list_length = this.upload_success_list ? this.upload_success_list.length : 0,
						self = this,
						set_file_callback;
						
					set_file_callback = function(){
							
						var append_list_img = function( src , key , value ){
								
							self.append_list_img( src /*file.result*/, set_index( key ) , function( res ){
								
								count = data.push({
									
									dom : res,
									
									files : value
									
								});

								upload();
									
								self.change_count();
								
							} );
							
						}
						
						if( self.browser_mode != 'ie' )
							
							return function( key , value ){
								
								var file = getfile();
						
								file.onload = function( e ){
									
									append_list_img( file.result , key , value );
									
								}
									
								file.readAsDataURL( value );
								
							};
							
						else
							
							return function( key , value ){
								
								var path;
								
								value.select();
					
								window.top.document.body.focus();
								
								path = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true",sizingMethod="scale",src="' + document.selection.createRange().text + '")';
								
								append_list_img( path , key , value );
								
							}
						
					}();
						
					if( this.browser_mode != 'ie' )

						this.each( target.files , function( key , value ){

							_target_files.push( value );

						});
						
					else
						
						_target_files.push( target ),
						
						this.add_input_file();

					this.upload_index = upload;

					this.this_all = this.this_all || 0;

					_target_files = max_length >= _target_files.length + this.this_all + done_list_length ?

					    _target_files :

					    this.err( 1 , true ) || _target_files.slice( 0 , max_length - this.this_all - done_list_length );

                    this.this_all += _target_files.length

					this.each( _target_files , function( key , value ){
						
						var file,
							target_value = value,
							count = 0;
						
						set_file_callback( key , value );
						
					});
					
				},
				page.prototype.getData = function( key ){
					
					return this.data ?
					
						( key ? this.data[ key ] : this.data ) :
						
						( this.data = [] );
					
				},
				page.prototype.create_element = function( node ){
					
					return document.createElement( node || 'div' );
					
				},
				page.prototype.create_input_file = function( node ){
					
					var input = this.create_element( 'input' );
					
					return input.className = 'get_file',
					
						input.type = 'file',
						
						input.onchange = function(){
							
							init.show_list( this );
							
						},
						
						input;
					
				},
				page.prototype.create_form = function( action , method ){
					
					var form = this.create_element( 'form' );
					
					return form.action = action,
					
						form.method = method,
						
						form.enctype = 'multipart/form-data',
						
						form.target = target_iframe_name,
						
						form;
					
				},
				page.prototype.create_add_img_input = function(){
					
					return $( this.create_input_file() ).appendTo( add_img_block_content ).blur();
					
				},
				page.prototype.sort_input = function( target , index ){
					
					var add_img_block_content_input = $( add_img_block_content ).children( 'input' ),
						_index = index === undefined ? 0 : index,
						index_input;
						
					if( !target )
						
						return;
						
					if( _index === false )
						
						$( add_img_block_content ).append( target );
						
					else 
						
						$( add_img_block_content_input.get( _index ) ).before( target );
					
					$( document.body ).focus();
					
				},
				page.prototype.append = function( arg1 , arg2 ){
					
					( arg2 || document.body ).appendChild( arg1 );
					
					return arg1;
					
				},
				page.prototype.append_list_img = function( src , index , callback ){
					
					var div = this.create_element( 'div' ),
						icon = this.create_element( 'a' ),
						_config = config.item,
						fill_txt = _config.fill_txt,
						self = this,
						target;
						
					if( this.browser_mode == 'ie' )
						
						target = this.create_element(),
						
						target.style.width = '100%',
						
						target.style.height = '100%',
						
						target.style.filter = src;
						
					else
						
						target = new Image(),
						
						target.src = src;
						
					div.className = 'item';
					
					div.id = index;
					
					icon.className = 'icon';
					
					icon.innerHTML = fill_txt;
					
					icon.href = 'javascript:;';
					
					icon.setAttribute( 'data-change_target' , index );

					icon.setAttribute( 'data-for' , 'drag,remove' );
						
					this.append( target , this.append( div , $( show_list ).get(0) ) );
							
					callback([target.id,div,src,index]);					
					
					this.append( icon , div );
					
				},
				page.prototype.change_count = function( index ){
					
					var progress = 0,
						_index = index == undefined ? this.this_data.length : index,
						all = _index === 0 && this.this_all === 0 ? 0 : 1 - _index / this.this_all;
					
					$( $( dom_count ).find( '[aria-valuenow]' ) ).attr( 'aria-valuenow' , progress = ( all * 100 ).toFixed( 2 ) ).css( 'width' , progress + '%' );
					
					$( $( dom_count ).find( '[data-show_value]' ) ).html( progress + '%' );
					
				},
				page.prototype.clear = function( index ){
					
					var self = this,
						remove_files = (function(){
							
							if( self.browser_mode == 'ie' )
								
								return function( files ){
									
									$( files ).remove();
									
									return true;
									
								}
								
							return function(){return true;}
							
						})();
					
					return this.upload_index(),

					index != undefined && this.this_data[ index ] ?
					
						$( this.this_data[ index ].dom[1] ).remove() && remove_files( this.this_data[ index ].files ) && this.this_data.splice( index , 1 ) && self.this_all -- :
						
						this.each( this.this_data , function( key , value ){
							
							$( value.dom[1] ).remove();
							
							remove_files( value.files );
							
							self.this_all --;
							
						}) || this.each( this.upload_success_list = this.upload_success_list || [] , function( key , value ){
							
							$( value.dom[1] ).remove();
							
						}) || ( this.upload_success_list = [] ) && ( this.data = [] ) && ( this.this_data = [] ) ,
						
						this.change_count();
					
				},
				page.prototype.change_status = function( target , type , index ){
					
					var _config = config.change_status,
						className_arr = _config.arr,
						className_string = _config.string;
						
					target.removeClass( className_string );
						
					if( !type ){

					    this.ready_status = 0;
						
						target.addClass( 'fail' ).removeClass( 'success' );
						
						if( className_arr[ index ] )
							
							target.addClass( className_arr[ index ] );
						
					} else if( this.ready_status = 1 )
						
						target.removeClass( 'fail' ).addClass( 'success' );
					
				},
				page.prototype.check_send_file = function( data ){
					
					var dom = data.dom,
						file = data.files,
						_config = config.pic,
						max_size = _config.max_size || 0,
						target;
						
					if( max_size && file.size > max_size )
						
						this.change_status( $( dom[1] ) , 0 , 0 );
						
					else
						
						return this.change_status( $( dom[1] ) , 1 ),
							
							true;
					
				},
				page.prototype.fail = function( type , data ){
					
					switch( type ){
						
						case 'send_file':
						
							return this.check_send_file( data );
						
					}
					
				},
				page.prototype.change_mini_list_status = function(){

				    var $mini_list = $( mini_list ),
				        self = this,
				        callback;

				    this.change_mini_list_status.status = this.change_mini_list_status.status || 0;

				    return callback = function(){

				        this.show = function(){

				            return self.change_mini_list_status.status || $( show_btn ).addClass( 'none' ) && $mini_list.addClass( "show" ) && ( self.change_mini_list_status.status = 1 );

				        };

				        this.hide = function(){

				            return self.change_mini_list_status.status && $( show_btn ).removeClass( 'none' ) && $mini_list.removeClass( "show" ) && !( self.change_mini_list_status.status = 0 );

				        };

				        this.hasShow = function(){

				            return self.change_mini_list_status.status;

				        };

				    },
				    new callback();

				},
				page.prototype.success_upload = function( index ){
					
					var self,data,list,this_file,show_mini_list_callback;
					
					return self = this,
					
						data = this.this_data,

						show_mini_list_callback = self.change_mini_list_status(),
					
						list = ( this.upload_success_list = this.upload_success_list || [] ),
					
						this.each( data , function( key , value ){
							
							if( index == value.index )
								
								return this_file = list[ list.push( value ) - 1 ],
								
								self.change_status( $( value.dom[1] ) , 1 ) ,

								show_mini_list_callback.show(),

								data.splice( key , 1 ),

								$( this_file.dom[1] ).appendTo( mini_list ),
								
								false;
							
						}),
						
						this.change_count(),

						this.upload_index();
					
				},
				page.prototype.remove = function( target ){
					
					var data_change = target.getAttribute( 'data-change_target' ),
						_target = document.getElementById( data_change ),
						data = this.this_data,
						self = this;
						
					if( _target )
						
						this.each( data , function( key , value ){
							
							if( value.dom[3] == data_change ){
								
								self.clear( key );
								
								return false;
								
							}
							
						});

					this.upload_index();
					
				},
				page.prototype.click = function( e ){
					
					var target = e.target,
					    self = this;

					this.change_mini_list_status().hide();

					this.each( ( target && target.getAttribute( 'data-for' ) || '' ).split( ',' ) , function( key , value ){

                        switch( value ){

                            case 'remove' :

                                return self.remove( target );

                            case 'show_mini_list':

                                return init.change_mini_list_status().show();

                        }

					});
					
				},
				page.prototype.handle_target = function( target ){

				    var _target = $( target ),
				        drag_config = config.drag,
				        item = drag_config.target;

				    if( !_target.is( item ) && !( _target = _target.parents( item ) ) )

				        return;

				    return $( _target );

				},
				page.prototype.drag_move = function( target , e ){

                    var target = this.drag_target,
                        dom,
                        status = target && this.drag_status == 'drag_status',
                        className = 'change_drag',
                        data = this.this_data,
                        self = this,
                        index,
                        dom,
                        w,
                        h,
                        _w,
                        _h,
                        _offset;

                    if( status && ( dom = $( target.dom[1] ) ) && ( w = dom.width() ) && ( h = dom.height() ) )

                        $( '.' + className ).removeClass( className ),

                        this.drag_change_target = undefined,

                        dom.css({

                            'position' : 'fixed',

                            'left' : e.clientX - w / 2 + 'px',

                            'top' : e.clientY - h / 2 + 'px',

                            'z-index' : 100000

                        }) , this.each( data , function( key , value ){

                            return _dom = $( value.dom[1] ),

                            _offset = _dom.offset(),

                            _w = [ _offset.left , _offset.left + _dom.width() ],

                            _h = [ _offset.top , _offset.top + _dom.height() ],

                            e.clientX >= _w[0] && e.clientX <= _w[1] && e.clientY >= _h[0] && e.clientY <= _h[1] ?

                                (

                                    self.drag_change_target = key ,

                                    _dom.addClass( className ),

                                    false

                                ) : undefined;

                        });

				},
				page.prototype.drag = function( target , event , type ){

				    var drag_config = config.drag,
				        max_time_length = drag_config.max_time_length,
				        className =  drag_config.className,
                        change_drag = 'change_drag',
                        get_index = function( id ){

                            return id.split( 'file_' )[1] - 0;

                        },
                        create_fill_drag_start_dom = function(){

                            var target;

                            return target = self.create_element( 'div' ),

                                target.className = 'item fill',

                                target;

                        },
                        $drag_target_dom,
                        $drag_be_target_dom,
                        data = this.this_data,
                        be_target,
                        replace_be_target,
				        self = this,
				        up_dom,
				        up_be_dom;

				    this.drag_status = this.drag_status || 0;

				    switch( type || 'start' ){

				        case 'start' :

				            event.preventDefault();

				            this.drag_status = setTimeout(function(){

                                self.drag_status = 'drag_status';

                                $( ( self.drag_target = self.splice_data( get_index( self.handle_target( target ).attr( 'id' ) ) )[0] ).dom[1] ).addClass( className ).before( self.fill_drag_start_dom = create_fill_drag_start_dom() )

                                //$( self.drag_target.dom[1] ).addClass( className );

                                self.drag_move( target , event );

				            } , max_time_length );

				            //console.log( this.handle_target( target ) , this.handle_target( target ).attr( 'id' ) , get_index( this.handle_target( target ).attr( 'id' ) ) , data )

				            //this.drag_target = this.splice_data( get_index( this.handle_target( target ).attr( 'id' ) ) )[0];

				            break;

				        case 'move' :

				            this.drag_move( target , event );

				            break;

				        case 'up' :

				            if( this.drag_status ){

                                $( '.' + change_drag ).removeClass( change_drag );

                                clearTimeout( this.drag_status );

                                this.drag_status = 0;

                                if( this.drag_target ){

                                    $drag_target_dom = $( this.drag_target.dom[1] ).removeClass( className ).css({position:'',left:'',top:'','z-index':''});

                                    $( self.fill_drag_start_dom ).remove() && ( self.fill_drag_start_dom = '' );

                                    if( this.drag_change_target != undefined )

                                        $drag_target_dom.before( up_be_dom = ( $drag_be_target_dom = $( data[ this.drag_change_target ].dom[1] ) ).before( up_dom = $drag_target_dom.clone().get(0) ).clone().get(0) ),

                                        $drag_target_dom.remove(),

                                        $drag_be_target_dom.remove(),

                                        this.insert_data( this.drag_target.index , ( ( replace_be_target = this.deep_copy( be_target = data[ this.drag_change_target ] ) ).dom[1] = up_be_dom ) && replace_be_target ),

                                        this.each( data , function( key , value ){

                                            return be_target == value ?

                                                self.splice_data( key , ( self.drag_target.dom[1] = up_dom ) && self.drag_target ) &&

                                                false : undefined;

                                        }),

                                        this.upload_index();

                                    else

                                        this.insert_data( this.drag_target.index , this.drag_target );

                                }

                                this.drag_target = '';

				            }

				            break;

				    }

				},
				page.prototype.splice_data = function( index , value ){

				    var data = this.this_data;

				    if( index != undefined )

				        return value ?

				            data.splice( index , 1 , value ) :

				            data.splice( index , 1 );

				},
				page.prototype.insert_data = function( index , value ){

				    var data = this.this_data;

				    if( index != undefined && value != undefined )

				        return data.splice( index , 0 , value );

				},
				page.prototype.allot = function( type ){

				    switch( type ){

				        case 'click':

				            return this.click( arguments[1] );

				        case 'mousedown':

				            return this.mousedown( arguments[1] );

				        case 'mousemove' :

				            return this.mousemove( arguments[1] );

				        case 'mouseup' :

				            return this.mouseup( arguments[1] );

				    }

				},
				page.prototype.mousedown = function( e ){

				    var target = e.target,
				        self = this;

					this.each( ( target && target.getAttribute( 'data-for' ) || '' ).split( ',' ) , function( key , value ){

                        switch( value ){

				            case 'drag' :

				                return self.drag( target , e );

                        }

					});

				},
				page.prototype.mousemove = function( e ){

				    this.drag( target , e , 'move' );

				},
				page.prototype.mouseup = function( e ){

				    this.drag( target , e , 'up' );

				},
				new page().init();

	    }

		window.init = page();
		
	</script>

</body>

</html>