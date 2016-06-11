/* Jump menu on cv page
---------------------------------*/
$(function() {

	// no scrolling yet
	var	scrolling 			= false;
	var contentSections 	= $('.cv-section');
	var verticalNavigation 	= $('.jump-menu');
	var navigationItems 	= verticalNavigation.find('a');

	$(window).on('scroll', checkScroll);
  	
  	// check if page is scrolled 
	function checkScroll() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
		}
	}

	function updateSections() {
		var halfWindowHeight 	= $(window).height()/2;
		var	scrollTop 			= $(window).scrollTop();
		
		contentSections.each(function(){
			var section 		= $(this);
			var	sectionId 		= section.attr('id');
			var	navigationItem 	= navigationItems.filter('[href^="#'+ sectionId +'"]');
			
			// update url with hash values
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) )
				? navigationItem.addClass('active')
				: navigationItem.removeClass('active');
		});

		// set scrolling back to false
		scrolling = false;
	}
});