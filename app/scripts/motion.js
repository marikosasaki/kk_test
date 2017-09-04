document.addEventListener('DOMContentLoaded', function() {
	$(window).scroll(function() {
		var value = $(this).scrollTop(); //スクロールの値を取得

		if (value > 100) {
			//$("nav").addClass('fade');
			//console.log('hoge');	

			TweenMax.to('header', 1, {opacity: 1});
			$("header").css('background-color','#ffffff');
		}


		else if (value == 0) {

			//$("nav").css('visibility','hidden');	
			//$("nav").removeClass('fade');

			TweenMax.to('header', 1, {opacity: 0});
		}

		$('#scrollValue').text(value);
	}); 



});