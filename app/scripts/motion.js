document.addEventListener('DOMContentLoaded', function() {
	$(window).scroll(function() {
		var value = $(this).scrollTop(); //スクロールの値を取得

		if (value > 100) {

			//$("nav").css('visibility','visible');
			console.log('hoge');	

			//TweenMax.to('header', 1, {opacity: 1});
		}
		else if (value == 0) {

			//$("nav").css('visibility','hidden');	
			console.log('hoge');	

			//TweenMax.to('header', 1, {opacity: 0});
		}

		$('#scrollValue').text(value);
	}); 



});