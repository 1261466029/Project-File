CKEDITOR.dialog.add(

	'serverimg',
	
	function(editor){
		
		var editor_url = window.url_list.editor_url,
			upload_file_url = window.url_list.upload_file_url || '',
			url = editor_url + 'plugins/_handle/handle_img.php',
			ajax_url = window.url_list.update_images,
			id = 'setFile_block',
			_default_style = 'width:100%;height:600px;padding:0;',
			init = function(){
				
				return document.getElementById( id ).contentWindow.init;
				
			},
			clear = function(){
				
				return init().clear();
				
			},
			query_target = function(){

				return init().getData();

			},
			create_iframe = function( id , name , src ){

				return '<iframe src="' + ( src || '' ) + '" ' + ( name ? 'name="'+ name +'"' : '' ) + ( id ? 'id="'+ id +'"' : '' ) + ' onload="(function(){this.contentWindow.ajax_url = \''+ ajax_url +'\'}).call( this )"></iframe>';

			};
			
		return {
			
			title : '이미지 업로드',
			minWidth : 800,
			minHeight : 600,
			contents : [{
				
				id : 'insert_img',
				label : '',
				title : '이미지 업로드',
				expand : true,
				padding : 0,
				elements:[{
					
					type : 'html',
					html : create_iframe( id , id , url ),
					style : _default_style
					
				}]
				
			}],
			onOk : function(){
				
				var data = query_target(),
					length = data.length,
					i = 0,
					html = '';
					
				while( i < length ){

					html += '<img style="margin:width:100%;display:block;" src="' + upload_file_url + data[ i ++ ][0] + '"/>';
					
				}
				
				editor.insertHtml( html );
				
				clear();
					
			}
			
		}
		
	}

);