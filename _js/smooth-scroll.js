/* Smooth scroll to top
------------------------------*/
$(function() {
	// items that need to trigger scroll action
	$('.jump-menu a, .back-to-top').click(function(e) {
	
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
			if (target.length) {
				// the smooth scrolling effect
				$('html, body').animate({	
					scrollTop: target.offset().top 
				}, 1000);
				
				// update url with hash values
				history.pushState({}, "", this.href);

				// don't handle links
				e.preventDefault();
			}	
		}
	});
});