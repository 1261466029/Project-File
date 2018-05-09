define( 'lang' , new function(){
	this.verify = {
		ins : {
			'check_empty' : {
				'success' : '',//' [0] 验证成功！ [2] ',
				'fail' : ' [0] 입력해주세요！ [1] '
			},
			'check_allway_assess' : {
				'success' : ' [0] 验证成功！ [2] ',
				'fail' : ' [0] 验证失败！ [1] '
			},
			'check_email' : {
				'success' : '',//'邮箱格式验证成功！ [2] ',
				'fail' : '정확한 이메일을 입력해주세요！ [1] '
			},
			'check_telnumber' : {
				'success' : '电话号码格式验证成功！ [2] ',
				'fail' : '电话号码格式验证失败！ [1] '
			},
			'check_allnumber' : {
				'success' : '全数字格式验证成功！ [2] ',
				'fail' : '全数字格式验证失败！ [1] '
			},
			'check_date' : {
				'success' : '日期格式验证成功！ [2] ',
				'fail' : '日期格式验证失败！ [1] '
			},
			'check_time' : {
				'success' : '时间格式验证成功！ [2] ',
				'fail' : '时间格式验证失败！ [1] '
			},
			'check_datetime' : {
				'success' : '日期时间格式验证成功！ [2] ',
				'fail' : '日期时间格式验证失败！ [1] '
			},
			'check_file' : {
				'success' : '文件格式校验成功！ [2] ',
				'fail' : '文件格式校验失败！ [1] '
			},
			'check_image' : {
				'success' : '图片文件校验成功！ [2] ',
				'fail' : '图片文件校验失败！ [1] '
			},
			'check_radio' : {
				'success' : ' [0] 验证成功！ [2] ',
				'fail' : ' [0] 验证失败！ [1] '
			},
			'password' : {

				'fail' : ' [0] repeat !'

			}
		},
		alert : {
			_default_verify_alert_header : 'verify',
			_default_verify_alert_btn_title : 'confirm'
		}
	};

	this.alert = {

        login : {

        	header : '관리자 로그인',

			username : '아이디',

			password : '비밀번호',

			btn_confirm : '로그인'

		},

		password : {

        	header : '글 비밀번호 입력',

			password : '비밀번호',

			btn_confirm : '확인',

			btn_login : '관리자 로그인'

		},

		remove : {

            header : '안내 팝업',

            body : '해당 글을 삭제하시겠습니까?',

            btn_confirm : '확인',

            btn_concel : '취소'

		}

	}
}() );