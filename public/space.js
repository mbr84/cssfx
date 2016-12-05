/* eslint-disable no-undef, func-names */

$(document).ready(() => {
  var space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth}/v1480305081/stars2_qiu9qm.jpg`
  $('.layered-spinner').css({ 'background-image': `url('${space}')` })
  $('.section4').css({ 'background-image': `url('${space}')` })

  $('.space').mousemove(function (e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);

    $('.space').hover(() => {
      $(this).css({ 'background-position': `${relativeX}px 350px, bottom left` });
    }, () => {
      $(this).css('background-position', 'center 150px, top left');
    });
    $('.space').trigger('mouseleave').trigger('mouseenter');
  });
});
