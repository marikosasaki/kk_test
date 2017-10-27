document.addEventListener('DOMContentLoaded', function() {

	hsize = $(window).height();

	$(".main").css("height", hsize + "px");	

	$('.effect>.container, .effect i ,header ,.main-massage').css("opacity","0");

	TweenMax.to('.main-massage', 2, {
		opacity: 1,
		y: -100
	});

	$(window).scroll(function() {

		var value = $(this).scrollTop(); //スクロールの値を取得

        $('.scroll_bg01').css('background-position', '10px ' + parseInt( -value / 50 ) + 'px'); // 1/50のスピード
        $('.scroll_bg02').css('background-position', '220px ' + parseInt( -value / 10 ) + 'px'); // 1/10のスピード
        $('.scroll_bg03').css('background-position', '440px ' + parseInt( -value / 2 ) + 'px'); // 1/2のスピード

		if (value > 100) {	
			TweenMax.to('header', 1, {opacity: 1});
			$("header").css('background-color','#ffffff');

		}

		else if (value == 0) {

			TweenMax.to('header', 1, {opacity: 0});
		}

		$(".effect").each(function(){
			var imgPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();

			if (scroll > imgPos - windowHeight){
				$("h2 ,.container",this).css("opacity","1" );

			} else {
				$("h2 ,.container ,.box",this).css("opacity","0" );
			}

			if (scroll > imgPos - windowHeight + windowHeight/4){
				TweenMax.staggerTo(".box", 0.5, {opacity:1}, 0.2);
			} else {
				
			}			
		});

		$('#scrollValue').text(value);
	});

});



