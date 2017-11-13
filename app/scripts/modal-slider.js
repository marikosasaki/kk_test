document.addEventListener('DOMContentLoaded', function() {

	$(function () {
		$("#navi a").click(function(){
			 //$("#main img").attr("src" , $(this).attr("href"));
			$("#main img").before("<img src='"+$(this).attr("href")+"' width='500px' alt=''>");
			//$("#main img").before("<img src='aaa'alt=''>");
			$("#main img:last").fadeOut("fast" ,function(){
				$(this).remove();
			})
			return false;

		})
		// body...
	})

});



