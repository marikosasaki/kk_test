window.addEventListener('DOMContentLoaded', function (event) {

	$(".modal-open").on('click tap', function () {
		current_scrollY = $(window).scrollTop();
		$("#pagetop").css({
			position: 'fixed',
			width   : '100%',
			top     : -1 * current_scrollY
		});

		$("#pagetop").append('<div id="modal-bg"></div>');
		$("#modal, #modal-bg").fadeIn("fast");
	});

	$(".btn-modal-close").on('click tap', function () {
		$("#pagetop").attr({style: ''});
		$('html, body').prop({scrollTop: current_scrollY});

		$("#modal, #modal-bg").fadeOut("fast", function () {
			$('#modal-bg').remove();
		});
	});
});