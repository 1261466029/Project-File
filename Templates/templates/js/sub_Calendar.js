!function(){

    $.fn.extend({

        calendar : function( event ){

            var calendar = function(){

                return new calendar.fn.init();

            } , count_Feb = function(){

                var m = dateList[1];

                if( m % 4 == 0 ){

                    if( m % 100 == 0 && m % 400 == 0 )

                        return 28;

                    return 29;

                }

                return 28;

            } , queryFirstDay = function(){

                var num = [],
                    date = dateList[2];

                num[0] = date % 7 ;

                num[1] = day - num[0] + 1;

                firstDay = num[1] < 0 ? 7 + num[1] : num[1];

            } , createBody = function(){

                var body = '',
                    trLeft = '<tr>',
                    trRight = '</tr>',
                    initLeft = '<td>',
                    initRight = '</td>',
                    tempArr = [],
                    num = firstDay,
                    i = 1,
                    count = 0,
                    length = monthList[ dateList[1] ];

                tempArr[ count ] = [];

                tempArr[ count ][num ++] = i ++;

                for( ; i <= length ; num ++ ){

                    tempArr[ count ] = tempArr[ count ] || [];

                    tempArr[ count ].push( i ++ );

                    if( num >= 6 && ( num = -1 ) ){

                        tempArr[ count ] = initLeft + tempArr[ count ].join( initRight + initLeft ) + initRight;

                        count ++;

                    }

                }

                tempArr[ count ] = initLeft + tempArr[ count ].join( initRight + initLeft ) + initRight;

                body = '<tbody>' + trLeft + tempArr.join( trRight + trLeft ) + trRight + '</tbody>';

                return body;

            } , createContainer  = function(){

                var body = createBody(),
                    id;

                self.calendarObj.each(function( key , value ){

                    $().calendar.id = $().calendar.id || 0;

                    id = $().calendar.id ++;

                    $( value ).append( createHeader( id ) + body + createFooter( id ) );

                });

            } , createHeader = function( id ){

                return '<table class="' + self.name + '" id="' + self.name + '_' + id + '"><thead><tr><td>Sun</td><td>Mon</td><td>Tues</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td></tr></thead>'

            } , createFooter = function( id ){

                return '<tfoot><tr><td colspan="7" data-type="click" data-change="show&hide" data-target="#'+ id +'" data-draggable="closeDateTable" data-index="00" ></td></tr></tfoot></table>';

            } ,
                date,firstDay,day,self,
                dateList,
                monthList = [31,28,31,30,31,30,31,31,30,31,30,31],
                dayslist = [ 'Sun' , 'Mon' , 'Tues' , 'Wed' , 'Thur' , 'Fri' , 'Sat' ];

            calendar.fn = calendar.prototype = {

                constructor : calendar,

                init : function( newDate ){

                    var Localdate;

                    self = this;

                    typeof newDate == 'string' && newDate ? ( ( date = new Date( newDate ) ) == 'Invalid Date' ? ( date = new Date() ) : '' ) : ( date = new Date() );

                    day = date.getDay();

                    Localdate = date.toLocaleDateString().split( '/' );

                    dateList = [ date.getFullYear() , date.getMonth() , date.getDate() ];

                    monthList[1] = count_Feb();

                    self.year = Localdate[0];

                    self.month = Localdate[1] < 9 ? '0' + Localdate[1] : Localdate[1];

                    self.date = Localdate[2] < 10 ? '0' + Localdate[2] : Localdate[2];

                    self.days = dayslist[ day ];

                    self.time = date.getTime();

                    self.DATE = self.year + '-' + self.month + '-' + self.date;

                    self.calendarObj = $( event );

                    if( self.calendarObj.length <= 0 ){

                        self.calendarObj = $( '<div>' );

                        $( 'body' ).append( self.calendarObj );

                    }

                    self.name = 'DateContainer';

                    return self;

                } ,

                showCal : function(){

                    queryFirstDay();

                    createContainer();

                }

            };

            calendar.fn.init.prototype = calendar.prototype;

            return calendar();

        }

    })

}();