$.fn.extend({

    checkForm:function( form ){

    var form = form,
        oFReader = new FileReader(),
        trim = function( string ){

            return ( typeof string == 'string' ? string : '' ).replace( /^\s+|\s+$/g , '' );

        },
        lib = {

            monthList : {

                january : '01',
                'jan.':'01',
                'jan':'01',
                february : '02',
                'feb.':'02',
                'feb':'02',
                march : '03',
                'mar.':'03',
                'mar':'03',
                april : '04',
                'apr.':'04',
                'apr':'04',
                may : '05',
                june : '06',
                'jun.':'06',
                'jun':'06',
                july : '07',
                'jul.':'07',
                'jul':'07',
                august : '08',
                'aug.':'08',
                'aug':'08',
                september : '09',
                'sep.':'09',
                'sep':'09',
                'sept.':'09',
                'sept':'09',
                october : '10',
                'oct.':'10',
                'oct':'10',
                november : '11',
                'nov.':'11',
                'nov':'11',
                december : '12',
                'dec.':'12',
                'dec':'12'

            }

        },
		is_reg = function( reg ){
			
			return Object.prototype.toString.call( reg ) == "[object RegExp]";
			
		},
		is_function = function( func ){
			
			return typeof func == 'function';
			
		},
        is_dom = function( dom ){

            return typeof HTMLElement === 'object' ? dom instanceof HTMLElement : dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string';

        },
        rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,
        reg = {

            testDate : function( argu ){

                var argument = trim( argu ),
                    monthNameList = lib.monthList,
                    result = argument.match(/(\d{4})|(\d{1,2})|([a-zA-Z\.]{3,})/g),
                    reg1 = /^\d{4}$/,
                    reg2 = /^((0?\d)|(1[012]))$/,
                    reg3 = /^((0?\d)|([12]\d)|(3[01]))$/,
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

                index = reg1.test( result[0] ) ? 0 : ( reg1.test( result[ last ] ) ? last : undefined );

                if( index == undefined )

                    return;

                date[0] = result[ index ];

                result.splice( index , 1 );

                foreach( result , function( okey , ovalue ){

                    key = (ovalue + '').toLowerCase();

                    if( monthNameList[ key ] ){

                        date[1] = monthNameList[ key ];

                        result.splice( okey , 1 );

                        return false;

                    }

                } );

                if( date[1] - 0 === 0 ){

                    index = index == 0 ? index : index - 1;

                    date[1] = result[ index ];

                    if( !reg2.test( date[1] ) )

                        return;

                    result.splice( index , 1 );

                    date[1] = date[1] < 10 ? '0' + (date[1] - 0) : date[1]-0+'';

                }

                result[0] = parseInt(result[0]);

                if( reg3.test( result[0] ) )

                    date[2] = result[0] < 10 ? '0' + (result[0] - 0) : result[0]-0+'' ;

                else

                    return ;

                return ( date = new Date( date.join( '/' ) ) ),date == 'Invalid Date' ? undefined : ( ( date = date.toLocaleDateString().split('/') ),(date[0] = date[0] < 10 ? '0' + (date[0] - 0) : date[0]-0+''),(date[1] = date[1] < 10 ? '0' + (date[1] - 0) : date[1]-0+''),(date[2] = date[2] < 10 ? '0' + (date[2] - 0) : date[2]-0+''),date.join('-') );

            },

            testTime : function( argu ){

                var argument = trim( argu ),
                    reg1 = /^(\d{1,2})\s*\:\s*(\d{1,2})\s*\:\s*(\d{1,2})$/,
                    reg2 = /^(0?\d|1\d|2[0123])$/,
                    reg3 = /^(0?\d|[12345]\d)$/,
                    result = argument.match( reg1),
                    data,
                    index = result ? result.index : undefined;

                if( index === undefined )

                    return;

                if( reg2.test( result[1] ) && reg3.test( result[2] ) && reg3.test( result[3] ) )

                    data = [ result[1] < 10 ? '0' + ( result[1] - 0 ) : result[1] - 0 , result[2] < 10 ? '0' + ( result[2] - 0 ) : result[2] - 0 ,  result[3] < 10 ? '0' + ( result[3] - 0 ) : result[3] - 0  ];

                return data ? data.join(':') : data;

            },

            testDateTime : function( argu ){

                var argument = trim( argu),
                    reg1 = /(\d{1,2})\s*\:\s*(\d{1,2})\s*\:\s*(\d{1,2})/,
                    result = argument.match( reg1 ),
                    index = result ? result.index : undefined,
                    length,
                    temp = [],
                    data = [];

                if( index === undefined )

                    return;

                length = result[0].length;

                temp[0] = argument.split( result[0] ).join('');

                temp[1] = result[0];

                data[0] = reg.testDate( temp[0] );

                data[1] = reg.testTime( temp[1] );

                if( data[0] && data[1] )

                    return data.join( ' ' );

            },

            testTelNumber : function( argu ){

                var argument = trim( argu ),
                    reg1 = /^(((\+\d+)?|(\(\+?\d+\))?)((\s*\-?(\s*\d)+)+)+)$/,
                    reg2 = /\s*/g,
                    result,
                    data;

                data = argument.match(reg1);

                if (data == null)

                    return;

                result = [

                    data[2] ? data[2] : '',

                    data[5] ? data[5] : '',

                    data[6] ? data[6] : ''

                ].join('').replace(reg2, '');

                if (result && result.length > 0)

                    return result;

            } ,

            testEmail : function( argu ){

                var argument = trim( argu ),
                    reg1 = /^\w+@\w+\.\w+(\.\w+)?$/;

                return reg1.test( argument ) ? argument : undefined ;

            } ,
			
			testFile : function( argu , reg , callback ){
				
				var files = this.prop( 'files' ),
                    windowURL = window.URL || window.webkitURL,
                    result = [];
					
                if( !files || !files.length )

                    return;
					
				if( !is_reg( reg ) || !is_function( callback ) )
					
					reg = '';
					
				if( reg )

                foreach( files , function( key , value ){

                    if( reg.test(value.type) ){
						
						result.push( value );
						
						callback( value );
						
					} else {
						
						result = [];
						
						return false;
						
					}

                } );
				
				else
					
				foreach( files , function( key , value ){

					result.push( value );

                } );
				
				return result.length == 0 ? undefined : result;
				
			},

            testPicFile : function( argu ){

                var result;
				
				reg.testFile.call( this , argu , rFilter , function( data ){

                    var img = new Image();
					
					result = result ? result : {};

					result[ value.name ] = {

						obj : img,

						time : value.lastModified,

						size : ( value.size / 1000000 ).toFixed( 2 ) + 'MB',

						type : value.type

					};

					img.src = windowURL.createObjectURL(value);
					
				} );

                return result;

            },

            testEmpty : function( argu ){

                var argument = trim( argu );

                if( argument && argument.length > 0 )

                    return argument;

            }

        },
        formUnit = {};


    var foreach = function( obj , callback , bl ){

            var num = 0,
                length;

            if( typeof obj != 'object' || obj == null )

                return;

            length = obj.length;

            if( length )

                for( ; obj[ num ] ; num ++ ){

                    if( callback( num , obj[ num ] ) === false )

                        return num;

                }

            else if( !bl )

                for( num in obj ){

                    if( callback( num , obj[ num ] ) === false )

                        return num;

                }

            else

                for( num in obj ){

                    if( obj.hasOwnProperty( num ) ){

                        if( callback( num , obj[ num ] ) === false )

                            return num

                    }

                }

        },
        headleForm = function(){

            form = $( form );

            if( ( form.length || ( form = $( 'form' ) ).length ) && form.prop( 'nodeName' ) == 'FORM' )

                form = $( form[0] );

            else if( !(form = '' ) )

                return;

            return form;

        },
        headleArguments = function(){

            var createFunc = function(){

                    var func = function(){

                        return new func.ii.init();

                    };

                    func.ii = func.prototype = {

                        constructor : func,

                        init : function(){

                            var obj = $();

                            obj.length = 0;

                            obj.selector = 'By CreateFunc';

                            this.obj = obj;

                            return this;

                        },

                        append : function( value ){

                            var obj = [],
                                self = this;

                            if( value.__proto__.constructor.name == 'Array' )

                                obj = value;

                            else if( value )

                                obj.push( value );

                            else

                                return;

                            foreach( obj , function( key , value ){

                                self.obj[ self.obj.length ++ ] = value;

                            } );

                        },

                        remove : function( value ){

                            var self = this;

                            foreach( self.obj , function( okey , ovalue ){

                                if( ovalue == value )

                                    delete self.obj[ okey ];

                            } )

                        },

                        show : function(){

                            return this.obj;

                        }

                    };

                    func.ii.init.prototype = func.ii;

                    return func();

                },
                formDataList = form.prop( 'elements' ),
                data = {},
                target,
                result,
                i;

            for( i in formDataList ){

                if( formDataList.hasOwnProperty( i ) && i != 'length' && isNaN( i ) )

                    data[i] = formDataList[i];

            }

            foreach( data ,function( key , value ){

                if( is_dom( value ) && value.type != 'checkbox' && value.type != 'radio' )

                    formUnit[ key ] = {

                        dataIndex : value.getAttribute( 'data-index' ),

                        dom : value,

                        value : value.value

                    };

                else {
					
					if( value.toString() != "[object RadioNodeList]" )
						
						value = [value];

                    result = {

                        type : 'checkbox',

                        dom : undefined,

                        value : []

                    };

                    foreach( value , function( okey , ovalue ){

                        if( is_dom( ovalue ) ){

                            if( ovalue.checked )

                                result.value.push( ovalue.value );

                            if( !result.dom )

                                result.dom = createFunc().obj;

                            result.dom[ result.dom.length ++ ] = ovalue;

                            result.dataIndex = result.dataIndex || ovalue.getAttribute( 'data-index' );

                        }

                    });

                    formUnit[ key ] = result;

                }

            },true);

        },
        check = function( json ){

            json = typeof json == 'object' && json != null ? json : {};

            var type = json.type || {},
                default_callback =  new Function(),
                success = typeof json.success == 'function' ? json.success : default_callback,
                fail = typeof json.fail == 'function' ? json.fail : default_callback ;

            this.start = function(){

                var form_children,
                    result,
                    index,
                    target,
                    _value;

                if( success == default_callback && fail == default_callback )

                    return;

                foreach( formUnit , function( key , value ){

                    target = $( value.dom );

                    _value = value.value;

                    index = target.data( 'index' );

                    if( value.type == 'checkbox' && type[ index ] !== undefined ){

                        if( _value.length > 0 )

                            return success.call( target , _value , key );

                        return fail.call( target , key );

                    }

                    if( type[ index ] === undefined )

                        return ;

                    else if( reg[ type[ index ] ] )

                        result = reg[ type[ index ] ].call( target , _value );

                    else if( typeof type[ index ] == 'function' )

                        result =  type[ index ].call( target , _value );

                    else

                        result = reg[ 'testEmpty' ].call( target , _value );

                    if( result )

                        return success.call( target , result , key );

                    return fail.call( target ,  key );

                } );

            }

        },
        check_form = function(){

            this.check = function( json ){

                return new check( json ).start();

            };

        };

    if( !headleForm() )

        return ;

    headleArguments();

    return new check_form();

}

});