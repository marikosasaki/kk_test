document.addEventListener('DOMContentLoaded', function() {

	//動画を画面サイズいっぱいにしたい。
	hsize = $(window).height();
	$(".main").css("height", hsize + "px");	

	//要素を時間差で表示させたいから一旦非表示
	$('.effect>.container, .effect i ,.motion ,.massage-inner, .page-title, .arrow-icon').css("opacity","0");

	TweenMax.to('.page-title', 1, {
		opacity: 1,
		//y: -100
	});

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
        $('.scroll_bg02').css('background-position', '220px ' + parseInt( -value / 10 ) + 'px'); // 1/10のスピード
        $('.scroll_bg03').css('background-position', '440px ' + parseInt( -value / 2 ) + 'px'); // 1/2のスピード

		if (value > 100) {	
			TweenMax.to('.motion', 1, {opacity: 1});
			$(".motion").css('background-color','#ffffff');
		}

		else if (value == 0) {
			TweenMax.to('.motion', 1, {opacity: 0});
		}

		$(".effect").each(function(){
			var imgPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();

			if (scroll >= imgPos - windowHeight){
				$("h2 ,.container, i",this).css("opacity","1" );

			} else {
				$("h2 ,.container i",this).css("opacity","0" );
			}

		});

		$('#scrollValue').text(value);
	});

});



