/* eslint-disable no-undef, func-names */

$(document).ready(() => {
  const space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth},q_auto:low/v1480305081/stars2_qiu9qm.jpg`
  $('.layered-spinner').css({ 'background': `url('${space}')`, 'background-position': '100%'  })
  $('.section4').css({ 'background': `url('${space}')` })

  $('.space').mousemove(function (e) {
    const offset = $(this).offset();
    let relativeX = (e.pageX - offset.left);
    if (relativeX > $(this).width() / 2) {
      relativeX *= 1.5;
    } else {
      relativeX -=  ($(this).width() - relativeX) / 2 ;
    }

    $('.space').hover(() => {
      $(this).css({ 'background-position': `${relativeX}px 135%, bottom left`, transition: '8s' });
    }, () => {
      $(this).css('background-position', 'center -150px, top left');
    });
    $('.space').trigger('mouseleave').trigger('mouseenter');
  });

  $(window).resize(() => {
    const space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth},q_auto:low/v1480305081/stars2_qiu9qm.jpg`
    $('.layered-spinner').css({ 'background': `url('${space}')`, 'background-position': '100%'  })
    $('.section4').css({ 'background': `url('${space}')`})
  });

  setTimeout(() => $('body').css("background-color", "black"), 1000);
});
