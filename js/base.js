/*
 *author:yefengbar.com 
 * version:0.1.0
 * data:2016-05-12
 * right:(c) Copyright 2016 hcq. All Rights Reserved. 
 */
!function() {
	dyGame = {
		rule_name: /^[a-zA-z][a-zA-Z0-9_.@]{4,20}$/,
		rule_phone: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/,
		rule_pass: /^[\s\S]{6,20}$/,
		rule_code: /^\d{6}$/,
		tipColor: '#0FA6D8',
		msg: ['用户名为4-20位字符', '密码为6-20位字符', '两次密码不一致', '请正确填写12位手机号', '请输入短信中的6位验证码', '登陆中···', '注册中···', '提交中···', '短信发送中···', '页面类型配置错误，请检查配置参数!'],
		defaults: {},
		_conf: function(options) {
			$.extend(dyGame.defaults, options);
			dyGame.init();
		},
		init: function() {
			switch (dyGame.defaults.category) {
				case 'index':
					dyGame.pageIndex();
					break;
				case 'login':
					dyGame.pageLog();
					break;
				case 'register':
					dyGame.pageReg();
					break;
				case 'findpass':
					dyGame.pageFindpass();
					break;
				case 'game':
					dyGame.pageGame();ucenter
					break;
				case 'ucenter':
					dyGame.pageUser();
					break;
				default:
					layer.msg(dyGame.msg[9], {
						icon: 0
					});
					break;
			}
		},
		pageIndex: function() {
			$('.loger .log .btn_log').bind('click', function() {
				login()
			});
			$('.loger .reg .btn_log').bind('click', function() {
				register()
			});
			$('.main_r .loger .mr_tit span').click(function() {
				var _this = $(this).index();
				$('.main_r .loger .mr_tit span').removeClass('cur').eq(_this).addClass('cur');
				$('.main_r .logdiv .log,.logdiv .reg').hide();
				if (_this == 0) {
					$('.main_r .logdiv .log').show();
				} else {
					$('.main_r .logdiv .reg').show();
				}
			});
			$(".main_r .log .ins").keydown(function(e) {
				var curKey = e.which;
				if (curKey == 13) {
					login();
					return false;
				}
			});
			$(".main_r .reg .ins").keydown(function(e) {
				var curKey = e.which;
				if (curKey == 13) {
					register();
					return false;
				}
			});

			function login() {
				var n = $('#name').val(),
					p = $('#pass').val();
				if (n && n.match(dyGame.rule_name)) {
					if (p && p.match(dyGame.rule_pass)) {
						layer.msg(dyGame.msg[5], {
							icon: 16,
							time: 10000
						});
						$('.main_r .logdiv .log,.main_r .logdiv .reg').hide();
						$('.main_r .logdiv .ser').show()
					} else {
						layer.tips(dyGame.msg[1], '#pass', {
							tips: [1, dyGame.tipColor]
						});
					}
				} else {
					layer.tips(dyGame.msg[0], '#name', {
						tips: [1, dyGame.tipColor]
					});
				}
			};

			function register() {
				var rn = $('#rname').val(),
					rp = $('#rpass').val(),
					rep = $('#repass').val();
				if (rn && rn.match(dyGame.rule_name)) {
					if (rp && rp.match(dyGame.rule_pass)) {
						if (rep === rp) {
							layer.msg(dyGame.msg[6], {
								icon: 16,
								time: 10000
							});
							$('.main_r .logdiv .log,.main_r .logdiv .reg').hide();
						$('.main_r .logdiv .ser').show()
						} else {
							layer.tips(dyGame.msg[2], '#repass', {
								tips: [1, dyGame.tipColor]
							});
						}
					} else {
						layer.tips(dyGame.msg[1], '#rpass', {
							tips: [1, dyGame.tipColor]
						});
					}
				} else {
					layer.tips(dyGame.msg[0], '#rname', {
						tips: [1, dyGame.tipColor]
					});
				}
			}
		},
		pageLog:function(){
			$('.login .bl_log').bind('click',function(){
					login()
				});
				$(".login input").keydown(function(e){ 
					var curKey = e.which; 
					if(curKey == 13){ 
						login();
						return false; 
					} 
				}); 
				function login(){
					var n = $('#name').val(),p = $('#pass').val();
						if(n && n.match(dyGame.rule_name)){
							if(p && p.match(dyGame.rule_pass)){
								layer.msg(dyGame.msg[5], {icon: 16,time:10000});
							}else{
								layer.tips(dyGame.msg[1], '#pass', {
									tips: [1, dyGame.tipColor]
								});
							}
						}else{
							layer.tips(dyGame.msg[0], '#name', {
								tips: [1, dyGame.tipColor]
							});
						}
				}
		},
		pageReg: function() {
			$('.bl_log').bind('click', function() {
				register();
				return false;
			});
			$('.yzm .send').bind('click', getCode);
			$(".bl_con .bl_inp input").keydown(function(e) {
				var curKey = e.which;
				if (curKey == 13) {
					register();
					return false;
				}
			});

			function sendCode() {
				layer.msg(dyGame.msg[8], {
					icon: 16,
					time: 10000
				});
			};

			function countTime() {
				var times = 60,
					timer = setInterval(conut, 1000);

				function conut() {
					if (times == 0) {
						clearInterval(timer);
						$('.yzm .send').html('发送');
						$('.yzm .send').bind('click', getCode)
					} else {
						$('.yzm .send').html(times + 's');
						times--;
					}
				}
			}

			function getCode() {
				var phone = $('#rphone').val();
				if (phone && phone.match(dyGame.rule_phone)) {
					countTime();
					sendCode();
					$('.yzm .send').unbind('click');
				} else {
					layer.tips(dyGame.msg[3], '#rphone', {
						tips: [1, dyGame.tipColor]
					});
				}

			}

			function register() {
				var rn = $('#rname').val(),
					rm = $('#rphone').val(),
					rc = $('#rcode').val(),
					rp = $('#rpass').val(),
					rep = $('#repass').val();
				if (rn && rn.match(dyGame.rule_name)) {
					if (rm && rm.match(dyGame.rule_phone)) {
						if (rc && rc.match(dyGame.rule_code)) {
							if (rp && rp.match(dyGame.rule_pass)) {
								if (rep === rp) {
									layer.msg(dyGame.msg[6], {
										icon: 16,
										time: 10000
									});
								} else {
									layer.tips(dyGame.msg[2], '#repass', {
										tips: [1, dyGame.tipColor]
									});
								}
							} else {
								layer.tips(dyGame.msg[1], '#rpass', {
									tips: [1, dyGame.tipColor]
								});
							}
						} else {
							layer.tips(dyGame.msg[4], '#rcode', {
								tips: [1, dyGame.tipColor]
							});
						}
					} else {
						layer.tips(dyGame.msg[3], '#rphone', {
							tips: [1, dyGame.tipColor]
						});
					}
				} else {
					layer.tips(dyGame.msg[0], '#rname', {
						tips: [1, dyGame.tipColor]
					});
				}
			}
		},
		pageFindpass: function() {
			$('.bl_log').bind('click', function() {
				register();
				return false;
			});
			$('.yzm .send').bind('click', getCode);
			$(".bl_con .bl_inp input").keydown(function(e) {
				var curKey = e.which;
				if (curKey == 13) {
					register();
					return false;
				}
			});

			function sendCode() {
				layer.msg(dyGame.msg[8], {
					icon: 16,
					time: 10000
				});
			};

			function countTime() {
				var times = 60,
					timer = setInterval(conut, 1000);

				function conut() {
					if (times == 0) {
						clearInterval(timer);
						$('.yzm .send').html('发送');
						$('.yzm .send').bind('click', getCode)
					} else {
						$('.yzm .send').html(times + 's');
						times--;
					}
				}
			}

			function getCode() {
				var phone = $('#rphone').val();
				if (phone && phone.match(dyGame.rule_phone)) {
					countTime();
					sendCode();
					$('.yzm .send').unbind('click');
				} else {
					layer.tips(dyGame.msg[3], '#rphone', {
						tips: [1, dyGame.tipColor]
					});
				}

			}

			function register() {
				var rn = $('#rname').val(),
					rm = $('#rphone').val(),
					rc = $('#rcode').val(),
					rp = $('#rpass').val(),
					rep = $('#repass').val();

				if (rm && rm.match(dyGame.rule_phone)) {
					if (rc && rc.match(dyGame.rule_code)) {
						if (rp && rp.match(dyGame.rule_pass)) {
							if (rep === rp) {
								layer.msg(dyGame.msg[7], {
									icon: 16,
									time: 10000
								});
							} else {
								layer.tips(dyGame.msg[2], '#repass', {
									tips: [1, dyGame.tipColor]
								});
							}
						} else {
							layer.tips(dyGame.msg[1], '#rpass', {
								tips: [1, dyGame.tipColor]
							});
						}
					} else {
						layer.tips(dyGame.msg[4], '#rcode', {
							tips: [1, dyGame.tipColor]
						});
					}
				} else {
					layer.tips(dyGame.msg[3], '#rphone', {
						tips: [1, dyGame.tipColor]
					});
				}
			}
		},
		pageGame:function(){
			$('.nav li a').bind('mouseenter',function(){
				if($(this).parent('li').hasClass('alllist')){
					$('.allClass').slideDown();
				}
			});
			$('.nav .alllist').bind('mouseout',function(e){
				var yy = getMousePos(e);
				if(yy<132){
					$('.allClass').slideUp();
				}
			});
			$('.allClass').bind('mouseout',function(e){
				var yy = getMousePos(e);
				if(yy<=132 || yy>=517){
					$('.allClass').slideUp();
				}
			});
			function getMousePos(event) {
	            var e = event || window.event;
	            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	            var x = e.pageX || e.clientX + scrollX;
	            var y = e.pageY || e.clientY + scrollY;
	            return  y
			}
		},
		pageUser:function(){
			getTab(0);
			function getTab(type){
				var n = type || 0;
				$('.ucenter .s_btns a').eq(n).addClass('cur').siblings().removeClass('cur');
				$('.ucenter .uc_tabs').hide();
				$('.ucenter .uc_tab_'+n).show();
			}
			$(function(){
				$('.ucenter .s_btns a,.edit_info').bind('click',function(){
					var n = $(this).data('type') || $(this).index();
					getTab(n)
				})
			})
			
		}
	}
}();
