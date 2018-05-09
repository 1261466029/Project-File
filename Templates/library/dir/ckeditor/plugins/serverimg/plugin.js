CKEDITOR.plugins.add(

	'serverimg',
	{
		
		requires : ['dialog'],
		lang : ['en'],
		init : function( editor ){
			
			editor.addCommand( 'serverimg' , new CKEDITOR.dialogCommand( 'serverimg' ) );
			
			editor.ui.addButton(
			
				'serverimg',
				
				{
					
					label : '이미지 업로드',
					command : 'serverimg',
					icon : this.path + 'images/pic.png',
					toolbar : 'insert'
					
				}
				
			);
			
			CKEDITOR.dialog.add( 'serverimg', this.path + 'dialogs/code.js' );
						
		}
		
	}

)