/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

    config.image_previewText = '';

    config.extraPlugins = 'serverimg,image2,line_height';
	
	config.toolbar = 'MyConfig';
	
	config.toolbar_MyConfig = [
	
		[ 'Source' , '-' , 'Templates' , '-' , 'Cut' , 'Copy' , 'Paste' , 'PasteText' , 'PasteFromWord' , '-' , 'Find' , 'Replace' , '-' , 'SelectAll' ],
		
		[ 'Bold' , 'Italic' , 'Underline' , 'Strikethrough' , 'Subscript' , 'Superscript' , '-' , 'CopyFormatting' , 'RemoveFormat' , '-' , 'NumberedList' , 'BulletedList' , '-' , 'Outdent' , 'Indent' , '-' , 'JustifyLeft' , 'JustifyCenter' , 'JustifyRight' , 'JustifyBlock' , '-' , 'BidiLtr' , 'BidiRtl' , 'setLanguage' , '-' , 'Link' , 'Unlink' ],

		[ 'Image' , 'Table' , 'HorizontalRule' , 'smiley' , 'SpecialChar' , 'serverimg' ],

        '/',
		
		[ 'Styles' , '-' , 'Format' , '-' , 'Font' , '-' , 'FontSize' , '-' , 'TextColor' , 'BGColor' , '-' , 'Maximize' , 'ShowBlocks' , '-' , 'line_height' ]
	
	]

};
