<?php



?>

<!DOCTYPE html>
<html>
<head>

<style>
	
	ul,li{
		
		list-style:none;
		
		padding:0;
		
		margin:0;
		
	}
	
	a{
		
		text-decoration:none;
		
		color:#333;
		
	}

	.page_body .page_option{
		
		margin:15px auto;
		
		font-size:12px;
		
	}
	
	.page_body .page_option:after,.page_body .page_option:before{
		
		content:'';
		
		display:block;
		
		clear:both;
		
	}
	
	.page_body .page_option .right{
		
		margin-left:15px;
		
		position:relative;
		
	}
	
	.page_body .page_option .left{
		
		padding:5px;
		
	}
	
	.page_body .page_option .left,.page_body .page_option .right{
		
		float:left;
		
	}
	
	.page_body .page_option .selection{
		
		border:1px solid #ddd;
		
		border-radius:5px;
		
		padding:5px;
		
	}
	
	.page_body .page_option .show+.detail{
		
		height:auto;
		
		min-height:90px;
		
		border:1px solid #ddd;
		
	}
	
	.page_body .page_option .detail{
		
		background-color:#fff;
		
		text-align:center;
		
		height:0;
		
		min-height:0;
		
		transition:all .5s;
		
		overflow:hidden;
		
		position:absolute;
		
		top:100%;
		
		left:0;
		
		width:calc( 100% - 2px );
		
		z-index:1000;
		
	}
	
	.page_body .page_option .detail .item a{
		
		display:block;
		
		padding:5px 0;
		
	}
	
	.page_body .page_option .detail .item a:hover{
		
		background-color:#ff5400;
		
		color:#fff;
		
	}

</style>

</head>
<body>

	<div class="page_body">
	
		<div class="page_option">
		
			<div class="left">
			
				设置行高 :
			
			</div>
			
			<div class="right">
			
				<input id="lineHeight_number" name="lineHeight_number" placeholder="请选择..." class="selection"/>
			
				<ul class="detail">
				
					<li class="item"><a href="javascript:;" data-value="1.0" data-target="lineHeight_number">1.0</a></li>
				
					<li class="item"><a href="javascript:;" data-value="1.5" data-target="lineHeight_number">1.5</a></li>
				
					<li class="item"><a href="javascript:;" data-value="2.0" data-target="lineHeight_number">2.0</a></li>
				
					<li class="item"><a href="javascript:;" data-value="2.5" data-target="lineHeight_number">2.5</a></li>
				
					<li class="item"><a href="javascript:;" data-value="3.0" data-target="lineHeight_number">3.0</a></li>
				
				</ul>
			
			</div>
		
		</div>
	
		<div class="page_option">
		
			<div class="left">
			
				设置段落间距 :
			
			</div>
			
			<div class="right">
			
				<input id="pMargin_number" name="pMargin_number" placeholder="请选择..." class="selection"/>
			
				<ul class="detail">
				
					<li class="item"><a href="javascript:;" data-value="0" data-target="pMargin_number">0px</a></li>
				
					<li class="item"><a href="javascript:;" data-value="5px" data-target="pMargin_number">5px</a></li>
				
					<li class="item"><a href="javascript:;" data-value="10px" data-target="pMargin_number">10px</a></li>
				
					<li class="item"><a href="javascript:;" data-value="15px" data-target="pMargin_number">15px</a></li>
				
				</ul>
			
			</div>
		
		</div>
		
		<div class="page_option">
		
			<button id="submit_change">
			
				应用
			
			</button>
		
			<button id="submit_clear">
			
				恢复默认值
			
			</button>
		
		</div>
	
	</div>
	
	<script>
	
		var each = function( arr , callback ){
			
			var i = 0;
			
			for( ; i < arr.length ; i ++ )
				
				if( callback.call( arr[i] , i , arr[i] , arr ) === false ){return;}
			
		}, get_target = function( target ){
			
			return document.getElementById( target );
			
		},target = document.querySelectorAll( '.page_option .detail .item a' ),
		
		context = document.querySelector( '.page_body' ),
		
		selection = document.querySelectorAll( '.page_body .page_option .selection' ),
		
		change_show_className = 'selection show',
		
		change_hide_className = 'selection',
		
		data = window.data = {},
		
		set_data = function( key , value ){return data[ key ] = value;},
		
		change_show = function(){
			
			this.className = change_show_className;
			
		},
		
		change_hide = function(){
			
			var self = this;
			
			setTimeout(function(){
				
				self.className = change_hide_className;
				
			} , 300)
			
		},
		
		bind_callback = function(){
			
			var target = this.getAttribute( 'data-target' ),
				dom_target = get_target( target ),
				value = this.getAttribute( 'data-value' );
				
			return dom_target.value = value,
			
				data[ target ] = value,
			
				dom_target;
			
		},
		
		bind_change = function(){
			
			return set_data( this.name , this.value );
			
		},
		
		each_selection = function( callback ){
			
			each( selection , callback );
			
		};
		
		each_selection( function(){
			
			this.onfocus = change_show;
			
			this.onblur = change_hide;
			
			this.onchange = bind_change;
			
			data[ this.name ] = '';
			
		} );
		
		context.onclick = function( e ){
			
			var target = e.target;
			
			if( target.getAttribute( 'data-target' ) )
				
				bind_callback.call( target );
			
		}
		
		document.getElementById( 'submit_change' ).onclick = function(){
			
			window.use_change && window.use_change( data );
			
		}
		
		window.clear_callback = document.getElementById( 'submit_clear' ).onclick = function(){
			
			window.clear && window.clear();
			
			data = {};
			
			each_selection( function(){
				
				this.value = '';
				
			} );
			
		}
	
	</script>

</body>
</html>