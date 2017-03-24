'use strict';

$(document).ready(function () {
  $('.open-menu-button').click(function () {
    $('.plus').toggleClass('plus-hide');
  });

  var fabDisplay = function fabDisplay() {
    if (window.innerWidth < 800) {
      $('#desktop').attr('id', 'mobile');
      $('.left-scroll .section6').append($('#mobile'));
    } else {
      $('#mobile').attr('id', 'desktop');
      $('.right-scroll .section6').append($('#desktop'));
    }
  };

  fabDisplay();
  $(window).resize(fabDisplay);
});