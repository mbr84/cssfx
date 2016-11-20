/* eslint-disable no-undef, func-names */

$(document).ready(() => {
  $('.space').mousemove(function (e) {
    const offset = $(this).offset();
    const relativeX = (e.pageX - offset.left);

    $('.space').hover(() => {
      $(this).css({ 'background-position': `${relativeX}px 350px, bottom left` });
    }, () => {
      $(this).css('background-position', 'center 150px, top left');
    });
    $('.space').trigger('mouseleave').trigger('mouseenter');
  });
});
