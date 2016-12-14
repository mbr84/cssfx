/* eslint-disable no-undef, func-names */

$(document).ready(() => {
  var space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth}/v1480305081/stars2_qiu9qm.jpg`
  $('.layered-spinner').css({ 'background-image': `url('${space}')` })
  $('.section4').css({ 'background-image': `url('${space}')` })

  $('.space').mousemove(function (e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    if (relativeX > $(this).width() / 2) {
      relativeX *= 1.5;
    } else {
      relativeX -=  ($(this).width() - relativeX) / 2 ;
    }
    console.log(relativeX)

    $('.space').hover(() => {
      $(this).css({ 'background-position': `${relativeX}px 135%, bottom left`, transition: '8s' });
    }, () => {
      $(this).css('background-position', 'center -150px, top left');
    });
    $('.space').trigger('mouseleave').trigger('mouseenter');
  });
});
