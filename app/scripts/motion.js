document.addEventListener('DOMContentLoaded', function() {
	$(window).scroll(function() {
		var value = $(this).scrollTop(); //スクロールの値を取得

		if (value > 100) {

			$("nav").css({
			});

			TweenMax.to('header', .5, {opacity: 1});
		}

		$('#scrollValue').text(value);
	}); 



});