document.addEventListener('DOMContentLoaded', function() {

	//ページ内リンク


	//動画を画面サイズいっぱいにしたい。
	hsize = $(window).height();
	$(".main").css("height", hsize + "px");	

	//要素を時間差で表示させたいから一旦非表示
	$('.effect>.container, .effect i ,.motion ,.massage-inner, .page-title, .arrow-icon').css("opacity","0");

	TweenMax.to('.page-title', 1, {
		opacity: 1,
		//y: -100
	});

	// if (window.matchMedia('screen and (min-width:600px)').matches) { 
	// }

	TweenMax.to('.massage-inner ,.page-massage', 2, {
		opacity: 1,
		y: -100
	});	

	TweenMax.to('.arrow-icon', 3, {
		opacity: 1,
		y: 50
	});



	//スクロールごとの表示
	$(window).scroll(function() {

		var value = $(this).scrollTop(); //スクロールの値を取得

        $('.scroll_bg01').css('background-position', '10px ' + parseInt( -value / 50 ) + 'px'); // 1/50のスピード
        $('.scroll_bg02').css('background-position', '10px ' + parseInt( -value / 10 ) + 'px'); // 1/50のスピード
        $('.line-at-bg2').css('background-position', '0px ' + parseInt( -value / 60 ) + 'px'); // 1/2のスピード

		if (value > 100) {	
			$("header").css('background-color','#ffffff');
			$("header").addClass('fixed');
		}

		 else if (value < 100) {
		 	console.log('hoge');
			$("[data-opne]").on('click', function () {
				console.log('hoge');
				$("header").css('position','fixed');
			})
			$("[data-close]").on('click', function () {
				console.log('fuga');
				$("header").css('position','static');
			})					
		}

		else if (value == 0) {

			//$("header").css('background-color','#ffffff');
			$("header").removeClass('fixed');
		}

		$(".effect").each(function(){
			var imgPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();

			if (scroll >= imgPos - windowHeight){
				$("h2 ,.container, i",this).css("opacity","1" );

			} else {
				$("h2 ,.container i",this).css("opacity","0");
			}

		});

		$('#scrollValue').text(value);
	});

});



