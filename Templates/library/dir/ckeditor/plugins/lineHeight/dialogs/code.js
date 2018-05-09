CKEDITOR.dialog.add(

	'lineHeight',
	
	function(editor){
		
		var id = 'change_lineHeight',
			container_style = 'padding:15px;width:350px;height:200px;',
			src = './test.php',
			create_content = function(){
				
				return '<iframe id="' + id + '" src="' + src + '"></iframe>';
				
			},
			get_iframe_window = function(){
				
				var w;
				
				return w = document.getElementById( id ).contentWindow,
				
					w.use_change = change_selected_style,
					
					w.clear = clear;
				
			},
			get_data = function(){
				
				return document.getElementById( id ).contentWindow.data;
				
			},
			clear_callback = function(){
				
				return document.getElementById( id ).contentWindow.clear_callback();
				
			},
			change_selected_style = function( data ){
				
				var marginStyle = data.pMargin_number && data.pMargin_number + ' 0',
					lineHeightStyle = data.lineHeight_number && data.lineHeight_number,
					style = {};
					
				lineHeightStyle && ( style[ 'line-height' ] = lineHeightStyle );
				
				editor.applyStyle( new CKEDITOR.style( { element: '*' , styles : style } ) );
					
				marginStyle && ( style = {} , style.margin = marginStyle );
				
				editor.applyStyle( new CKEDITOR.style( { element: 'p' , styles : style } ) );
				
			},
			clear = function(){
				
				var data;
				
				editor.applyStyle( new CKEDITOR.style( { element: 'p' , styles : {margin:''} } ) );
				
				editor.applyStyle( new CKEDITOR.style( { element: '*' , styles : {'line-height':''} } ) );
				
			};
			
			console.log( editor )
			
		return {
			
			title : '改变 行距',
			minWidth : 350,
			minHeight : 0,
			contents : [{
				
				id : 'lineHeight',
				label : '',
				title : '改变 行距',
				expand : true,
				padding : 0,
				elements:[{
					
					type : 'html',
					html : create_content(),
					style : container_style
					
				}]
				
			}],
			
			onLoad : get_iframe_window,
			
			onOk : function(){
				
				change_selected_style( get_data() );
				
				clear_callback();
				
			},
			
			onCancel : clear_callback
			
		}
		
	}

);