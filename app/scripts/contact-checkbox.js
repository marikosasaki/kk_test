
$(function () {
	$("#test5").change(function(){

	   if($("#test5:checked").val()) {
	     $("#send-btn").removeClass('disabled');
	   }
	   else {
	     $("#send-btn").addClass('disabled');
	   }
	})
});




