document.addEventListener('DOMContentLoaded', function() {
	$(window).scroll(function() {
		var value = $(this).scrollTop(); //スクロールの値を取得

		if (value > 100) {

			$("nav").css({
			});

			TweenMax.to('header', 1, {opacity: 1});
		}
		else if (value == 0) {

			TweenMax.to('header', 1, {opacity: 0});
		}

		$('#scrollValue').text(value);
	}); 



});