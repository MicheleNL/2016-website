/**
 * Show or hide back to top btn
 */
$(document).scroll(function() {
  var y = $(this).scrollTop();
  var viewportHeight = $(window).innerHeight();

  if (y > viewportHeight) {
    $('.back-to-top').fadeIn();
  } else {
    $('.back-to-top').fadeOut();
  }
});
