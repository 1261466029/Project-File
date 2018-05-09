CKEDITOR.plugins.add(

	'lineHeight',
	{
		init : function( editor ){
			
			var self = this;
			
			editor.addCommand( 'lineHeight' , new CKEDITOR.dialogCommand( 'lineHeight' ) );
			
			CKEDITOR.dialog.add( 'lineHeight', this.path + 'dialogs/code.js' );
			
			editor.ui.addButton(
			
				'lineHeight',
				
				{
					
					label : 'line height',
					command : 'lineHeight',
					icon : this.path + 'images/pic.png',
					toolbar : 'insert'
					
				}
				
			);
						
		}
		
	}

)