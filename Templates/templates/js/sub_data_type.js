/**
 * Created by 0 on 2017/9/29.
 */

//组件:init,
//通过查询dom中的data-type标签，来进行结构化处理
//可以在dom中 写入 data-type 标签 来控制要做的行为
//data-type="click"( 通过固定的方法对dom进行操作 ) =>需要四个属性的配合 data-draggable="唯一标识" data-target="需要改变的集合=>eq:'.page_body>.banner .banner_view'" data-index="对应的下标" data-change="click类型"
//                                               =>data-change 现在可支持的类型有 'switchView' => 点击某个dom 切换另一个dom层
//                                               =>data-change 现在可支持的类型有 'show&hide' => 点击某个dom 隐藏或显示另一个dom层
//                                               =>data-change 现在可支持的类型有 'toast' => 点击某个dom 弹窗
$().ready(function(){

    var bindList = {

        bind : {

            click : {

            }

        }

    };

    $( window ).on( 'click' , function( event ){

        console.log( arguments );

        var triggle_target = $( event.target );

        if( triggle_target.data( 'type' ) != 'click' )

            triggle_target = $( $( event.target ).parents( '[data-type="click"]' ) );
			
        if( triggle_target.length > 0 ){

            var self = triggle_target,
                target = self.data( 'target'),
                index = self.data( 'index') - 0,
                change = self.data( 'change'),
                draggable = self.data( 'draggable'),
                Data = bindList,
                status = Data.bind.click[ change ],
                timer, count = 0,
                _target,
                before_active,
                callback,
                start,
                end,
                after;

            eval( 'callback = ' + self.data( 'callback' ) );

            if( typeof callback == 'object' && callback != null ){

                start = callback[ 'start' ] || '';

                end = callback[ 'end' ] || '';

                after = callback[ 'after' ] || '';

            }

            target = $( target );

            _target = $( target[ index ] );

            before_active = $( '.active[data-draggable="' + draggable + '"]' );

            if( ( typeof start == 'function' ? start( triggle_target , target , _target , !status ) : false ) || status )

                return;

            Data.bind.click[ change ] = 1;

            bindList = Data;

            switch( change ){

                case 'switchView':

                    if( target <= 0 || _target <= 0 )

                        return;

                    target.hide();

                    before_active.removeClass( 'active' );

                    target.removeClass( 'active' );

                    self.addClass( 'active' );

                    if( typeof end == 'function' )

                        end( _target , target );

                    _target.addClass( 'active').fadeIn( 500 , function(){

                        Data.bind.click[ change ] = 0;

                        Data = bindList;

                        if( typeof after == 'function' )

                            after( _target , target , function( key ){

                                Data.bind.click[ change ] = key;

                                Data = bindList;

                            } );

                    });

                    break;

                case 'show&hide':

                    if( target <= 0 || _target <= 0 )

                        return;

                    if( typeof end == 'function' )

                        end( _target , target );

                    if( _target.hasClass( 'active' ) ){

                        _target.fadeOut( 500 , function(){

                            Data.bind.click[ change ] = 0;

                            bindList = Data;

                            if( typeof after == 'function' )

                                after( _target , target , function( key ){

                                    Data.bind.click[ change ] = key;

                                    bindList = Data;

                                } , 'out' );

						} );
						
						_target.removeClass( 'active' );
						
					}

                    else {

                        _target.fadeIn( 500 , function(){

                            Data.bind.click[ change ] = 0;

                            bindList = Data;

                            if( typeof after == 'function' )

                                after( _target , target , function( key ){

                                    Data.bind.click[ change ] = key;

                                    bindList = Data;

                                } , 'in' );

                        } );
						
						_target.addClass( 'active' );
					
					}

                    break;

                case 'toast':

                    var head = self.data( 'head' ),
                        body = self.data( 'body' ),
                        btn = self.data( 'btn' );

                    try{

                        head = eval( head );

                    }catch( error ){}

                    try{

                        body = eval( body );

                    }catch( error ){}

                    try{

                        btn = eval( btn );

                    }catch( error ){}

                    $().showToast({

                        head : head,

                        body : body,

                        btn : btn

                    });

                    Data.bind.click[ change ] = 0;

                    bindList = Data;

                    break;
					
				case 'jump':
				
					var url = self.data( 'url');
					
					if( url )
				
						window.location.href = url;
					
					break;

            }

        }

    });

});