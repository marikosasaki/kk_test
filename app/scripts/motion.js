document.addEventListener('DOMContentLoaded', function() {

	hsize = $(window).height();

	$(".main").css("height", hsize + "px");	

	$('.effect div, .effect i ,header ,.main-massage').css("opacity","0");

	TweenMax.to('.main-massage', 2, {
		opacity: 1,
		y: -20
	});

	$(window).scroll(function() {

		var value = $(this).scrollTop(); //スクロールの値を取得
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

			if (scroll > imgPos - windowHeight + windowHeight/5){
				$("h2, div",this).css("opacity","1" );
				$("i",this).css({
				 // "font-size": "100px",
				 // "padding": "0 20px 40px"
				});
			} else {
				$("h2, div",this).css("opacity","0" );
				$("i",this).css({
				 // "font-size": "20px",
				//  "padding": "20px"
				});
			}

		});

		$('#scrollValue').text(value);
	});

});



